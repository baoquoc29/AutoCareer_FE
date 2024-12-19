import React, {useEffect, useRef, useState} from 'react';
import {Dropdown, List, Avatar, Badge, Button, Spin} from 'antd';
import {BellOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {
    count_unread_notifications,
    get_all_paging_notifications, mask_read_all_notifications,

} from '../../Redux/actions/NotificationThunk';
import "./NotificationStyle.css"
import {vi} from 'date-fns/locale';
import {formatDistanceToNow} from "date-fns";

const NotificationDropdown = () => {
        const dispatch = useDispatch();
        const notifications = useSelector((state) => state.NotificationReducer?.notifications);
        const unreadAmount = useSelector((state) => state.NotificationReducer?.unreadCount);
        const totalElements = useSelector((state) => state.NotificationReducer?.totalElements);
        const userId = useSelector((state) => state.UserReducer.userData?.id);

        const [pageNo, setPageNo] = useState(1);
        const [pageSize, setPageSize] = useState(7);
        const [loading, setLoading] = useState(false);
        const [hasMore, setHasMore] = useState(true); // Kiểm tra còn dữ liệu hay không
        const [allNotifications, setAllNotifications] = useState([]);
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [selectedNotification, setSelectedNotification] = useState(null);
        const observer = useRef();
        // useEffect(()=>{
        //     dispatch(get_all_paging_notifications())
        // })
        // Lấy dữ liệu lần đầu
        useEffect(() => {
            if (userId) {
                dispatch(get_all_paging_notifications(pageNo - 1, pageSize))
                console.log(totalElements)
                if (totalElements > pageSize) {
                    setHasMore(false)
                }
                dispatch(count_unread_notifications());
            }
        }, [userId]);
        useEffect(() => {
            setAllNotifications(notifications)
        }, [notifications])
        // useEffect(() => {
        //     if (totalElements < pageSize) {
        //         setHasMore(false)
        //     }
        // }, [totalElements])
        // Tải thêm dữ liệu khi cuộn
        const loadMoreData = () => {
            if (loading || !hasMore) return;
            setLoading(true);
            dispatch(get_all_paging_notifications(pageNo, pageSize)).then(() => {
                setPageNo(pageNo + 1)
                if (totalElements > pageSize) {
                    setHasMore(false)
                }
            })
                .finally(() => setLoading(false));

        };
        const loadNotifications = (page, size) => {
            if (loading || !hasMore) return;
            setLoading(true);
            dispatch(get_all_paging_notifications(page - 1, size))
                .then(() => {
                    if (totalElements > pageSize) {
                        setHasMore(false)
                    }
                })
                .finally(() => setLoading(false));
        };

        // IntersectionObserver để theo dõi phần tử cuối danh sách
        const lastNotificationRef = (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNo((prevPageNo) => {
                        const nextPage = prevPageNo + 1;
                        loadNotifications(nextPage, pageSize);
                        return nextPage;
                    });
                }
            });
            if (node) observer.current.observe(node);
        };

        // Đánh dấu tất cả là đã đọc
        const markAllAsRead = () => {
            dispatch(mask_read_all_notifications())
                .then(() => {
                    dispatch(count_unread_notifications());
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        const showModal = (notification) => {
            setSelectedNotification(notification);
            setIsModalVisible(true);
        };

        const handleModalClose = () => {
            setIsModalVisible(false);
            setSelectedNotification(null);
        };

        const menu = (
                <div className="notification-dropdown">
                    <div className="dropdown-header">
                        <Button type="link"
                                size="small"
                                className="notification-new"
                                onClick={markAllAsRead}>
                            Đánh dấu tất cả đã đọc
                        </Button>
                    </div>
                    {/*<Spin spinning={loading}>*/}
                    <List
                        dataSource={notifications}
                        style={{maxHeight: '400px', overflowY: 'auto'}}
                        renderItem={(item, index) => {
                            const isLastItem = index === notifications.length - 1;
                            return (
                                <List.Item
                                    className="notification-item"
                                    ref={isLastItem ? lastNotificationRef : null}
                                    key={item.id}
                                    onClick={() => showModal(item)}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                icon={<BellOutlined/>}
                                                style={{
                                                    backgroundColor:
                                                        item.statusRead === "UNREAD" ? '#ff4d4f' : '#a8a7a7',
                                                }}
                                            />
                                        }
                                        title={<span>{item.title}</span>}
                                        description={
                                            <div>
                                                < span className="notification-description">{item.message}</span>
                                                <div style={{color: '#888', fontSize: '12px'}}>
                                                    {formatDistanceToNow(new Date(item.createdAt), {
                                                        locale: vi,
                                                        addSuffix: true
                                                    })}
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            );
                        }
                        }
                    />
                    {
                        loading && (
                            <div style={{textAlign: 'center', margin: '12px 0'}}>
                                <Spin/>
                            </div>
                        )
                    }
                </div>
            )
        ;

        return (
            <Dropdown overlay={menu} trigger={['click']}>
                <Badge count={unreadAmount}>
                    <Button type="text" icon={<BellOutlined/>}/>
                </Badge>
            </Dropdown>
        );
    }
;

export default NotificationDropdown;
