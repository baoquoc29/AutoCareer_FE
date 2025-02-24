import React, { useState, useEffect, useRef, useCallback } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Client } from "@stomp/stompjs";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN } from "../../Utils/Setting/Config";
import SockJS from "sockjs-client";
import { get_all_messages } from "../../Redux/actions/MessageThunk";
import "./ChatBox.css";

const ChatBox = ({ showChatBox, toggleChatBox }) => {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const [userId, setUserId] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const { isAuthenticated } = useSelector((state) => state.UserReducer);
    const messagesFromStore = useSelector((state) => state.MessageReducer.messages);
    const totalPages = useSelector((state) => state.MessageReducer.totalPages || []);
    const chatContentRef = useRef(null);
    const lastScrollHeight = useRef(0);
    const userScrolling = useRef(false);
    const [page, setPage] = useState(0);
    const [userName, setUserName] = useState(null);
    const [newMessageAlert, setNewMessageAlert] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            const userDetails = JSON.parse(localStorage.getItem(USER_LOGIN));
            if (userDetails?.id) {
                setUserId(userDetails.id);
                setUserName(userDetails.username);
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (userId && showChatBox) {
            dispatch(get_all_messages(page, 5, userId, 1));
        }
    }, [userId,page, dispatch, showChatBox]);

    useEffect(() => {
        if (messagesFromStore.length > 0) {
            if (page === 0) {
                setMessages(messagesFromStore);
                scrollToBottom(false);
            } else {
                setMessages((prev) => [...messagesFromStore, ...prev]);
            }
        }
    }, [messagesFromStore]);

    useEffect(() => {
        if (userId) {
            const socket = new SockJS("http://localhost:8081/auto-career/ws");
            const client = new Client({
                webSocketFactory: () => socket,
                onConnect: () => {
                    console.log("✅ WebSocket đã kết nối!");
                    client.subscribe(`/user/${userId}/queue/messages`, (message) => {
                        const chatMessage = JSON.parse(message.body);
                        setMessages((prev) => [...prev, chatMessage]);
                        setNewMessageAlert(true);
                        if (!userScrolling.current) {
                            scrollToBottom(true);
                        }
                    });
                },
                onStompError: (frame) => console.error("❌ Lỗi WebSocket:", frame),
            });
            client.activate();
            setStompClient(client);
            return () => client.deactivate();
        }
    }, [userId]);

    const fetchOldMessages = useCallback(async () => {
        if (!hasMore || !userId) return;
            if(hasMore) {
                setPage(page + 1);
            }
            else{
                console.log("het r");

            }
    }, [page, hasMore, userId, dispatch]);


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
                        chatBox.scrollTo({ top: chatBox.scrollHeight - lastScrollHeight.current, behavior: "auto" });
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
        if (!userId || page <= 0) return;
        try {
            const prevPage = page - 1;
            setPage(prevPage);
                scrollToBottom(true);

        } catch (error) {
            console.error("❌ Lỗi tải tin nhắn mới:", error);
        }
    }, [page, userId, dispatch]);




    const sendMessage = async () => {
        if (!messageInput.trim() || !stompClient || !userId) return;

        const message = {
            senderId: userId,
            userName: userName,
            receiverId: 1,
            content: messageInput.trim(),
            messageType: 1,
            fileUrl: null,
            createdAt: new Date().toISOString(),
            createdBy: "admin",
            status: 0,
            updatedAt: null,
            updatedBy: null,
        };

        // Gửi tin nhắn qua WebSocket
        stompClient.publish({
            destination: "/app/sendMessage",
            body: JSON.stringify(message),
        });

        // Cập nhật state tin nhắn ngay lập tức mà không cần gọi API
        setMessages((prev) => [...prev, message]);

        // Reset về page 0 và tải lại tin nhắn mới nhất
        setPage(0);
        setHasMore(true);
        setMessageInput("");
        scrollToBottom(true);
    };
    useEffect(() => {
        if (showChatBox) {
            setNewMessageAlert(false);
        }
    }, [showChatBox]);



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
        <div className={`chat-box-container ${showChatBox ? "show" : ""}`}>
            {showChatBox && (
                <div className="chat-box">
                    <div className="chat-header">
                        <span>Trò chuyện với hỗ trợ viên</span>
                        {newMessageAlert && <span className="new-message-alert">🔔 Tin nhắn mới</span>}
                        <button onClick={toggleChatBox} className="close-button">
                            <CloseOutlined/>
                        </button>
                    </div>

                    <div className="chat-intro">
                        <p>Chào bạn! Hãy gửi câu hỏi của bạn, chúng tôi sẽ hỗ trợ bạn ngay lập tức.</p>
                    </div>
                    <div
                        className="chat-content"
                        ref={chatContentRef}
                        onScroll={handleScroll}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            overflowY: 'auto',
                            height: '100%'
                        }}
                    >
                        {hasMore && page < totalPages - 1 && (
                            <p className="load-more" style={{textAlign: 'center'}}>Đang tải tin nhắn cũ...</p>
                        )}
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: msg.senderId === userId ? 'flex-end' : 'flex-start',
                                    marginBottom: '10px'
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: '70%',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: msg.senderId === userId ? '#dcf8c6' : '#ececec',
                                        alignSelf: msg.senderId === userId ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    <strong>{msg.senderId === userId ? "Bạn" : "Hỗ trợ viên"}:</strong> {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                        />
                        <button onClick={sendMessage}>Gửi</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
