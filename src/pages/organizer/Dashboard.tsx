
import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const OrganizerDashboard = () => {
  const data = [
    { name: 'Active', value: 4 },
    { name: 'Completed', value: 8 },
    { name: 'Upcoming', value: 2 },
  ];
  
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b'];
  
  return (
    <MobileLayout title="Organizer Dashboard">
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overview</CardTitle>
            <CardDescription>Your volunteer opportunity statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-around mt-4">
              {data.map((entry, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                  <span className="text-xl font-bold">{entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="font-medium">Beach Cleanup</p>
                <p className="text-sm text-muted-foreground">5 volunteers joined</p>
              </div>
              <div className="border-b pb-2">
                <p className="font-medium">Tree Planting</p>
                <p className="text-sm text-muted-foreground">Event completed</p>
              </div>
              <div>
                <p className="font-medium">Food Drive</p>
                <p className="text-sm text-muted-foreground">2 new applicants</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default OrganizerDashboard;
