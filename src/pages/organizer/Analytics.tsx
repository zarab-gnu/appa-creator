
import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const monthlyData = [
    { name: 'Jan', volunteers: 10 },
    { name: 'Feb', volunteers: 15 },
    { name: 'Mar', volunteers: 12 },
    { name: 'Apr', volunteers: 8 },
    { name: 'May', volunteers: 25 },
    { name: 'Jun', volunteers: 30 },
  ];
  
  const opportunityData = [
    { name: 'Beach Cleanup', volunteers: 15, hours: 45 },
    { name: 'Food Drive', volunteers: 8, hours: 24 },
    { name: 'Tree Planting', volunteers: 20, hours: 60 },
  ];
  
  return (
    <MobileLayout title="Analytics">
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="volunteers" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Opportunity Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunityData.map((item, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <div className="grid grid-cols-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Volunteers</p>
                      <p className="font-semibold">{item.volunteers}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Hours</p>
                      <p className="font-semibold">{item.hours}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Impact Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Volunteers</p>
                <p className="text-2xl font-bold">73</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold">219</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Completed Events</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Active Events</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Analytics;
