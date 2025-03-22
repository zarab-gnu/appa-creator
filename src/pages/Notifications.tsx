
import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';

const Notifications = () => {
  const mockNotifications = [
    { id: 1, title: 'New opportunity near you', time: '2 hours ago', read: false },
    { id: 2, title: 'Your application was accepted', time: '1 day ago', read: true },
    { id: 3, title: 'Reminder: Beach Cleanup tomorrow', time: '2 days ago', read: true },
  ];

  return (
    <MobileLayout title="Notifications">
      <div className="p-4">
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-lg border ${notification.read ? 'bg-background' : 'bg-primary/5 border-primary/20'}`}
            >
              <div className="flex justify-between items-start">
                <h3 className={`text-base ${notification.read ? 'font-normal' : 'font-semibold'}`}>
                  {notification.title}
                </h3>
                {!notification.read && (
                  <span className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
            </div>
          ))}
          
          {mockNotifications.length === 0 && (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Notifications;
