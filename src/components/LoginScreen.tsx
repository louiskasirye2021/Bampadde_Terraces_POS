import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { User, mockUsers } from '../utils/mockData';
import { Lock, UserCircle } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [pin, setPin] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      
      if (newPin.length === 4 && selectedUser) {
        if (selectedUser.pin === newPin) {
          onLogin(selectedUser);
        } else {
          setError('Invalid PIN');
          setTimeout(() => {
            setPin('');
            setError('');
          }, 1500);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setError('');
  };

  const handleClear = () => {
    setPin('');
    setSelectedUser(null);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-orange-950 p-4">
      <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur">
        <div className="text-center mb-8">
          <h1 className="text-orange-600 mb-2">Bampadde Terraces POS</h1>
          <p className="text-gray-600">Komamboga, Uganda</p>
        </div>

        {!selectedUser ? (
          <div className="space-y-4">
            <p className="text-center text-gray-700">Select User</p>
            <div className="grid grid-cols-1 gap-3">
              {mockUsers.map((user) => (
                <Button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="h-16 bg-gray-800 hover:bg-orange-600 text-white justify-start px-6"
                >
                  <UserCircle className="mr-3 h-6 w-6" />
                  <div className="text-left">
                    <div>{user.name}</div>
                    <div className="text-xs opacity-70">{user.role.toUpperCase()}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <UserCircle className="h-16 w-16 mx-auto text-orange-600 mb-2" />
              <p className="text-gray-700">{selectedUser.name}</p>
              <p className="text-xs text-gray-500 uppercase">{selectedUser.role}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Lock className="h-4 w-4" />
                <span className="text-sm">Enter PIN</span>
              </div>
              
              <div className="flex justify-center gap-2 mb-4">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${
                      error ? 'border-red-500 bg-red-50' : pin.length > i ? 'border-orange-600 bg-orange-50' : 'border-gray-300'
                    }`}
                  >
                    {pin.length > i && (
                      <div className={`w-3 h-3 rounded-full ${error ? 'bg-red-500' : 'bg-orange-600'}`} />
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                  <Button
                    key={digit}
                    onClick={() => handlePinInput(digit.toString())}
                    className="h-14 bg-gray-100 hover:bg-orange-600 hover:text-white text-gray-900 border border-gray-300"
                    disabled={pin.length >= 4}
                  >
                    {digit}
                  </Button>
                ))}
                <Button
                  onClick={handleBackspace}
                  className="h-14 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-900 border border-gray-300"
                >
                  ←
                </Button>
                <Button
                  onClick={() => handlePinInput('0')}
                  className="h-14 bg-gray-100 hover:bg-orange-600 hover:text-white text-gray-900 border border-gray-300"
                  disabled={pin.length >= 4}
                >
                  0
                </Button>
                <Button
                  onClick={handleClear}
                  className="h-14 bg-gray-100 hover:bg-gray-300 text-gray-900 border border-gray-300"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
