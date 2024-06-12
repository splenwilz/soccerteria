import { Order } from '@/lib/types';
import { getOrders, getUserBalance } from '@/lib/user';
import { currentUser } from '@clerk/nextjs/server';
import { useState, useEffect } from 'react';

const useUserData = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await currentUser();
                if (user) {
                    const userBalance = await getUserBalance(user!.id);
                    const firstUserBalance = userBalance[0] || {};
                    const balance = parseInt(firstUserBalance.balance || '0', 10);

                    setBalance(balance);
                    const data = await getOrders(user.id);
                    setOrders(data);
                } else {
                    console.error('User is not authenticated');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return { balance, orders };
};

export default useUserData;
