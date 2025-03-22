
import React from 'react';
import { useParams } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';

const Chat = () => {
  const { id } = useParams();
  
  return (
    <MobileLayout title={id ? `Chat with ${id}` : 'Messages'}>
      <div className="p-4">
        <div className="rounded-lg bg-muted/20 p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Chat Feature Coming Soon</h2>
          <p className="text-muted-foreground">
            We're working on implementing real-time messaging for volunteers and organizers.
          </p>
          {id && (
            <div className="mt-4 p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Chat ID: {id}</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Chat;
