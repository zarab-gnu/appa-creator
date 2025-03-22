
import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';

const Calendar = () => {
  return (
    <MobileLayout title="Calendar">
      <div className="p-4">
        <div className="rounded-lg bg-muted/20 p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Calendar Coming Soon</h2>
          <p className="text-muted-foreground">
            Track your volunteer commitments and schedule your availability.
          </p>
        </div>
        
        <div className="mt-6 border rounded-lg overflow-hidden">
          <div className="bg-primary/10 p-3 text-center font-medium">
            August 2023
          </div>
          <div className="grid grid-cols-7 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="py-2 text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {[...Array(31)].map((_, i) => (
              <div key={i} className="py-3 text-sm hover:bg-accent/50 cursor-pointer">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Calendar;
