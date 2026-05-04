import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Calendar, Clock, User as UserIcon } from 'lucide-react';
import { User } from '../utils/mockData';

interface BeginDayDialogProps {
  open: boolean;
  currentUser: User;
  onBeginDay: () => void;
}

export function BeginDayDialog({ open, currentUser, onBeginDay }: BeginDayDialogProps) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-UG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-UG', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Welcome to Bampadde Terraces</DialogTitle>
          <DialogDescription className="text-center">
            Start your work day to begin processing orders
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <UserIcon className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-500">Staff Member</p>
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-xs text-gray-500 uppercase">{currentUser.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold">{dateStr}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-500">Start Time</p>
              <p className="font-semibold">{timeStr}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onBeginDay}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg"
          >
            Begin Day
          </Button>
          <p className="text-xs text-center text-gray-500">
            Click "Begin Day" to start your shift and access the POS system
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
