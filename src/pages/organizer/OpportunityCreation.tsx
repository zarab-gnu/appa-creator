
import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const OpportunityCreation = () => {
  return (
    <MobileLayout title="Create Opportunity">
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">New Volunteer Opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Beach Cleanup, Food Drive, etc." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the volunteer opportunity in detail..."
                  className="min-h-32"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Address or location name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">Volunteer Capacity</Label>
                <Input id="capacity" type="number" min="1" placeholder="10" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills (comma separated)</Label>
                <Input id="skills" placeholder="Communication, Teamwork, etc." />
              </div>
              
              <Button type="submit" className="w-full">Create Opportunity</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default OpportunityCreation;
