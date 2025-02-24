import React, { useState, useEffect, useRef, useCallback } from "react";
import { Layout, List, Input, Button, Typography, Pagination } from "antd";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import { get_all_messages, get_all_users } from "../../../Redux/actions/MessageThunk";
import {CloseOutlined, ExclamationCircleOutlined, MessageOutlined, UserOutlined} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const ChatAdmin = () => {
    const dispatch = useDispatch();
    const [activeUser, setActiveUser] = useState(null);
    const [messageInput, setMessageInput] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const totalElements = useSelector((state) => state.MessageReducer.totalElements || 0);
    const listUsers = useSelector((state) => state.MessageReducer.users);
    const [users, setUsers] = useState([]);
    const [pageSize, setPageSize] = useState(8);
    const messagesFromStore = useSelector((state) => state.MessageReducer.messages);
    const totalPages = useSelector((state) => state.MessageReducer.totalPages || []);
    const [messages, setMessages] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const chatContentRef = useRef(null);
    const lastScrollHeight = useRef(0);
    const userScrolling = useRef(false);
    const [userPage, setUserPage] = useState(1);
    useEffect(() => {
        const socket = new SockJS("http://localhost:8081/auto-career/ws");
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe("/topic/support", (message) => {
                const chatMessage = JSON.parse(message.body);
                console.log(message.body);

                if (chatMessage.senderId === activeUser || chatMessage.receiverId === activeUser) {
                    setMessages((prev) => [...prev, chatMessage]);
                    if (!userScrolling.current) {
                        scrollToBottom(true);
                    }

                } else {
                    setUsers((prevUsers) => {
                        let updatedUsers = [...prevUsers];

                        const existingUserIndex = updatedUsers.findIndex(user => user.idUser === chatMessage.senderId);

                        if (existingUserIndex !== -1) {
                            // Nếu user đã tồn tại, cập nhật trạng thái `hasNewMessage`
                            updatedUsers[existingUserIndex] = {
                                ...updatedUsers[existingUserIndex],
                                hasNewMessage: true,
                            };

                            // Đưa user có tin nhắn mới lên đầu danh sách
                            const updatedUser = updatedUsers.splice(existingUserIndex, 1)[0];
                            updatedUsers = [updatedUser, ...updatedUsers];

                        } else {
                            if (updatedUsers.length >= pageSize) {
                                updatedUsers.pop(); // Xóa user cuối nếu danh sách quá dài
                            }

                            // Thêm user mới vào đầu danh sách
                            updatedUsers = [
                                {
                                    idUser: chatMessage.senderId,
                                    nameUser: chatMessage.userName,
                                    hasNewMessage: true,
                                    statusMessage: "UNREAD"
                                },
                                ...updatedUsers
                            ];
                        }

                        return updatedUsers;
                    });
                }
            });
        });

        client.activate();
        setStompClient(client);

        return () => client.deactivate();
    }, [activeUser, pageSize]);


    useEffect(() => {
        dispatch(get_all_users(userPage - 1, pageSize));
    }, [userPage, dispatch, pageSize]);

    useEffect(() => {
        if (messagesFromStore.length > 0) {
            setMessages((prevMessages) => {
                const mergedMessages = [...prevMessages, ...messagesFromStore];
                const uniqueMessages = Array.from(new Map(mergedMessages.map(m => [m.id, m])).values());
                return uniqueMessages;
            });
            if (!userScrolling.current) {
                scrollToBottom(false);
            }
        }
    }, [messagesFromStore]);



    useEffect(() => {
        if (activeUser) {
            dispatch(get_all_messages(currentPage, pageSize, activeUser, 1));
        }
    }, [activeUser, currentPage, pageSize, dispatch]);
    useEffect(() => {
        if (listUsers.length > 0) {
            setUsers(listUsers);
            console.log(users);
        }
    }, [listUsers]);
    useEffect(() => {
        if (users.length > 0 && !activeUser) {
            setActiveUser(users[0].idUser);
        }
    }, [users, activeUser]);

    const selectUser = useCallback((userId) => {
        setMessages(messagesFromStore);
        setActiveUser(userId);

        setUsers((prevUsers) =>
            prevUsers.map(user =>
                user.idUser === userId ? {...user, hasNewMessage: false} : user
            )
        );
    }, [messagesFromStore]);


    const sendMessage = useCallback(() => {
        if (!messageInput.trim()) return;
        if (!stompClient || !stompClient.connected) {
            console.error("WebSocket chưa kết nối. Không thể gửi tin nhắn.");
            return;
        }
        if (!activeUser) return;

        const message = {
            senderId: 1,
            receiverId: activeUser,
            content: messageInput,
            messageType: 1,
            createdAt: new Date().toISOString(),
            createdBy: "admin",
            status: 0
        };

        stompClient.publish({
            destination: "/app/sendMessage",
            body: JSON.stringify(message),
        });

        setMessages((prev) => [...prev, message]);

        setUsers((prevUsers) =>
            prevUsers.map(user =>
                user.idUser === activeUser
                    ? { ...user, hasNewMessage: false, statusMessage: "READ" }
                    : user
            )
        );

        setCurrentPage(0);
        setHasMore(true);
        setMessageInput("");
        scrollToBottom(true);
    }, [messageInput, stompClient, activeUser]);

    const handlePageChange = useCallback((page) => {
        setUserPage(page);
    }, []);

    const fetchOldMessages = useCallback(async () => {
        if (!hasMore || !activeUser) return;
        if (hasMore) {
            setCurrentPage(currentPage + 1);
        } else {
            console.log("het r");

        }
    }, [currentPage, hasMore, activeUser, dispatch]);


    const handleScroll = () => {
        const chatBox = chatContentRef.current;
        if (!chatBox) return;

        // Nếu cuộn lên trên cùng, tải tin nhắn cũ
        if (chatBox.scrollTop === 0 && hasMore) {
            lastScrollHeight.current = chatBox.scrollHeight;
            userScrolling.current = true;
            fetchOldMessages().then(() => {
                setTimeout(() => {
                    if (chatBox) {
                        chatBox.scrollTo({top: chatBox.scrollHeight - lastScrollHeight.current, behavior: "auto"});
                    }
                }, 200);
            });
        }

        // Nếu cuộn xuống dưới cùng, tải tin nhắn mới nhất
        if (chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - 50) {
            userScrolling.current = false;
            fetchNewMessages();
        }
    };
    const fetchNewMessages = useCallback(async () => {
        if (!activeUser || currentPage <= 0) return;
        try {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            scrollToBottom(true);

        } catch (error) {
            console.error("❌ Lỗi tải tin nhắn mới:", error);
        }
    }, [currentPage, activeUser, dispatch]);

    const scrollToBottom = (smooth) => {
        if (chatContentRef.current) {
            setTimeout(() => {
                chatContentRef.current.scrollTo({
                    top: chatContentRef.current.scrollHeight,
                    behavior: smooth ? "smooth" : "auto",
                });
            }, 100);
        }
    };

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div className="mt-auto">
                        <div className="row">
                            <div className="col-md-12">
                                <Layout style={{
                                    height: "80vh",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    display: "flex"
                                }}>
                                    {/* Sidebar */}
                                    <Sider width={280} style={{
                                        background: "#f8f9fa",
                                        padding: "15px",
                                        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}>
                                        <Title level={5} style={{
                                            textAlign: "center",
                                            marginBottom: "10px",
                                            fontWeight: "bold",
                                            color: "#333"
                                        }}>
                                            Danh sách người dùng
                                        </Title>
                                        <List
                                            bordered
                                            dataSource={users}
                                            renderItem={(user) => (
                                                <List.Item
                                                    style={{
                                                        cursor: "pointer",
                                                        background:
                                                            activeUser === user.idUser
                                                                ? "#007BFF"
                                                                : user.hasNewMessage
                                                                    ? "#ffeb3b"
                                                                    : "white",
                                                        color: activeUser === user.idUser ? "white" : "black",
                                                        fontWeight: user.hasNewMessage ? "bold" : "normal",
                                                        padding: "12px",
                                                        borderRadius: "5px",
                                                        marginBottom: "6px",
                                                        transition: "0.3s",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                    }}
                                                    onClick={() => selectUser(user.idUser)}
                                                >
                                                    {/* Tên người dùng */}
                                                    <span>{user.nameUser}</span>

                                                    {/* Hiển thị icon tin nhắn mới nếu có */}
                                                    {user.hasNewMessage && (
                                                        <MessageOutlined style={{ color: "red", marginLeft: "auto" }} />
                                                    )}

                                                    {/* Hiển thị icon cảnh báo nếu chưa được phản hồi */}
                                                    {user.statusMessage === "UNREAD"  && (
                                                        <ExclamationCircleOutlined
                                                            style={{ color: "orange", marginLeft: "10px" }}
                                                            title="Chưa phản hồi"
                                                        />
                                                    )}
                                                </List.Item>
                                            )}
                                        />

                                        <Pagination
                                            current={userPage}
                                            pageSize={pageSize}

                                            onChange={handlePageChange}
                                            total={totalElements}
                                            style={{marginTop: "15px", display: "flex", justifyContent: "center"}}
                                        />
                                    </Sider>

                                    <Layout style={{flex: 1, display: "flex", flexDirection: "column", height: "100%"}}>

                                        <Content style={{
                                            padding: "20px",
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%",
                                            background: "#f8f8f8",
                                            borderRadius: "8px"
                                        }}>
                                            {/* Tiêu đề chat */}
                                            <div className="chat-header" style={{
                                                color: "white",
                                                padding: "12px",
                                                textAlign: "center",
                                                fontSize: "18px",
                                                borderRadius: "6px",
                                            }}>
                                                Trò chuyện với khách hàng
                                            </div>

                                            {/* Lời nhắn chào mừng */}
                                            <div className="chat-intro" style={{
                                                padding: "12px",
                                                background: "#f9f9f9",
                                                textAlign: "center",
                                                fontSize: "15px",
                                                borderBottom: "1px solid #ddd"
                                            }}>
                                                <p>Hãy thật thân thiện và niềm nở!</p>
                                            </div>

                                            {/* Nội dung chat */}
                                            <div className="chat-content" ref={chatContentRef}
                                                 onScroll={handleScroll} style={{
                                                flex: 1,
                                                padding: "15px",
                                                overflowY: "auto",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "10px",
                                                background: "#fff",
                                                borderRadius: "6px",
                                                marginBottom: "10px",
                                                border: "1px solid #ddd"
                                            }}>
                                                {hasMore && currentPage < totalPages - 1 && (
                                                    <p className="load-more" style={{
                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                        color: "#888"
                                                    }}>
                                                        Đang tải tin nhắn cũ...
                                                    </p>
                                                )}

                                                {messages.map((msg, index) => (
                                                    <div key={index}
                                                         className={`chat-message ${msg.senderId !== activeUser ? "sent" : "received"}`}
                                                         style={{
                                                             padding: "10px 15px",
                                                             borderRadius: "8px",
                                                             maxWidth: "70%",
                                                             fontSize: "15px",
                                                             background: msg.senderId !== activeUser ? "#007BFF" : "#f1f1f1",
                                                             color: msg.senderId !== activeUser ? "white" : "black",
                                                             alignSelf: msg.senderId !== activeUser ? "flex-end" : "flex-start",
                                                             wordBreak: "break-word"
                                                         }}>
                                                        <strong style={{ color: msg.senderId !== activeUser ? "#111112" : "#111112" }}>
                                                            {msg.senderId !== activeUser ? "Hỗ trợ viên" : "Khách hàng"}:
                                                        </strong> {msg.content}

                                                    </div>
                                                ))}
                                            </div>

                                            {/* Ô nhập tin nhắn */}
                                            <div className="chat-input" style={{
                                                display: "flex",
                                                alignItems: "center",
                                                borderTop: "1px solid #ddd",
                                                padding: "12px",
                                                background: "#fff",
                                                borderRadius: "6px"
                                            }}>
                                                <input
                                                    type="text"
                                                    value={messageInput}
                                                    onChange={(e) => setMessageInput(e.target.value)}
                                                    placeholder="Nhập tin nhắn..."
                                                    style={{
                                                        flex: 1,
                                                        padding: "10px",
                                                        fontSize: "15px",
                                                        borderRadius: "8px",
                                                        border: "1px solid #ddd",
                                                        outline: "none"
                                                    }}
                                                />
                                                <button onClick={sendMessage} style={{
                                                    marginLeft: "10px",
                                                    padding: "10px 15px",

                                                    fontSize: "15px",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "8px",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "5px"
                                                }}>
                                                    <span>Gửi</span>
                                                    <i className="fas fa-paper-plane"></i>
                                                </button>
                                            </div>
                                        </Content>
                                    </Layout>
                                </Layout>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

    export default ChatAdmin;