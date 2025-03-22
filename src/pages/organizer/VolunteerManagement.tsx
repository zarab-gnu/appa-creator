
import React from 'react';
import { useParams } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, UserCheck, UserX } from 'lucide-react';

const VolunteerManagement = () => {
  const { id } = useParams();
  
  // Mock data for volunteers
  const volunteers = [
    { id: 1, name: 'Alex Johnson', status: 'confirmed', skills: ['First Aid', 'Communication'] },
    { id: 2, name: 'Jamie Smith', status: 'pending', skills: ['Photography', 'Social Media'] },
    { id: 3, name: 'Casey Williams', status: 'confirmed', skills: ['Organization', 'Leadership'] },
    { id: 4, name: 'Morgan Brown', status: 'pending', skills: ['Technology', 'Teaching'] },
  ];
  
  return (
    <MobileLayout title={`Volunteers for Event #${id}`}>
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Beach Cleanup - Santa Monica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <div>Date: <span className="font-medium">Aug 15, 2023</span></div>
              <div>Capacity: <span className="font-medium">10/15</span></div>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Volunteer List</h2>
          <div className="space-y-3">
            {volunteers.map((volunteer) => (
              <Card key={volunteer.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{volunteer.name}</h3>
                        <p className="text-xs text-muted-foreground">{volunteer.skills.join(', ')}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`text-xs py-1 px-2 rounded-full ${
                        volunteer.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {volunteer.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end gap-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    {volunteer.status === 'pending' ? (
                      <>
                        <Button size="sm" variant="outline" className="text-green-600">
                          <UserCheck className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <UserX className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" className="text-red-600">
                        <UserX className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default VolunteerManagement;
