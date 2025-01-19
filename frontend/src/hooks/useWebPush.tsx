import { useEffect, useState } from 'react';
import { encodeUint8Array, registerServiceWorker, urlB64ToUint8Array, WebPushSubscription } from '../sw.ts';
import axiosInstance from '@/api/api.ts';

const applicationServerPublicKey = import.meta.env.VITE_APPLICATION_SERVER_PUBLIC_KEY;

 
export const useWebPush = (isAuthenticated: boolean) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
    useEffect(() => {
        if (isAuthenticated) {

            registerServiceWorker().then(reg => {
                if (reg) {
                    setSwRegistration(reg);
                    console.log('Service Worker registered:', reg);
                }
            }).catch(error => {
                console.log("Error registering service worker:", error);
            })
        }
    }, [isAuthenticated])

    const subscribe = async (subscription: WebPushSubscription) => {
        try {
            const response = await axiosInstance.post('api/subscribe', subscription);
            console.log('Subscription successful:', response.data);
            return response.data;
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };

    const unsubscribe = async (id: number | undefined) => {
        try {
            const response = await axiosInstance.post('api/unsubscribe', { id });
            console.log("Unsubscribed:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error unsubscribing:", error);
        }
    };

    const subscribeFunction = async () => {
        if (!swRegistration) return;
        try {
            const subscribeParams = {
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey)  // To musi być Twój publiczny klucz VAPID
            };
            const subscription = await swRegistration.pushManager.subscribe(subscribeParams);
            setIsSubscribed(true);

            const keyArray = subscription.getKey('p256dh');
            const authArray = subscription.getKey('auth');

            if (keyArray && authArray) {
                const encodedKey = encodeUint8Array(new Uint8Array(keyArray));
                const encodedAuth = encodeUint8Array(new Uint8Array(authArray));

                const requestData: WebPushSubscription = {
                    public_key: encodedKey,
                    auth: encodedAuth,
                    notification_end_point: subscription.endpoint,
                    user_id: Number(localStorage.getItem('userId')),
                };

                await subscribe(requestData);
            }
        } catch (error) {
            console.log("🚀 ~ subscribeFunction ~ error:", error);
        }
    };

    const unsubscribeFunction = async (userId: number) => {
        if (!swRegistration) return;
        try {
            const subscription = await swRegistration.pushManager.getSubscription();
            await subscription?.unsubscribe();
            setIsSubscribed(false);

            // Ensure newSubscription has a valid id before calling unsubscribe
            if (userId) {
                await unsubscribe(userId);
                setNewSubscription(null);
            } else {
                console.log("No subscription id available for unsubscribe.");
            }
        } catch (error) {
            console.error('Error unsubscribing', error);
        }
    };

    return {
        unsubscribeFunction,
        subscribeFunction,
        isSubscribed
    };
}

