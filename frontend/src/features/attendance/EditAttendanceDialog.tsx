import React, { useState, useEffect } from 'react';
import { Attendance } from './types';

type EditAttendanceDialogProps = {
  initialValues?: Attendance;
  onSave: (attendance: Attendance) => void;
  isOpen: boolean;
  onClose: () => void;
};

const EditAttendanceDialog = ({
  initialValues,
  onSave,
  isOpen,
  onClose,
}: EditAttendanceDialogProps) => {
  const [attendance, setAttendance] = useState<Attendance>(initialValues || { id: 0, name: '', weekdays: [] });

  useEffect(() => {
    if (initialValues) {
      setAttendance(initialValues);
    }
  }, [initialValues]);

  const handleSave = () => {
    onSave(attendance);
  };

  if (!isOpen) return null;

  return (
    <div>
      <h3>{initialValues ? 'Edit Attendance' : 'Add Attendance'}</h3>
      <input
        type="text"
        value={attendance.name}
        onChange={(e) => setAttendance({ ...attendance, name: e.target.value })}
        placeholder="Employee Name"
      />
      <div>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
          <div key={index}>
            <label>{day}</label>
            <input
              type="text"
              value={attendance.weekdays[index] || ''}
              onChange={(e) =>
                setAttendance({
                  ...attendance,
                  weekdays: [
                    ...attendance.weekdays.slice(0, index),
                    e.target.value,
                    ...attendance.weekdays.slice(index + 1),
                  ],
                })
              }
            />
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditAttendanceDialog;
