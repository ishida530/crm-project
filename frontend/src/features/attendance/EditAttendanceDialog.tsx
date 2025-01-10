import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { attendanceSchema } from './validate';
import { Attendance, Status } from './types';

interface EditAttendanceDialogProps {
  initialValues?: Attendance | null;
  onSave: (attendance: Attendance) => void;
  isOpen: boolean;
  onClose: () => void;
}

const EditAttendanceDialog: React.FC<EditAttendanceDialogProps> = ({
  initialValues,
  onSave,
  isOpen,
  onClose,
}) => {
  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: initialValues || {
      user_id: 0,
      user_name: '',
      attendances: [
        { date: '', status: Status.PRESENT }, // Domyślne wartości
      ],
    },
  });

  const onSubmit = (data: z.infer<typeof attendanceSchema>) => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.error('Form errors:', form.formState.errors);
      return;
    }
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialValues ? 'Edit Attendance' : 'Add Attendance'}</DialogTitle>
          <DialogDescription>
            {initialValues
              ? 'Update the attendance information for the user.'
              : 'Provide details to create a new attendance record.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* User Name Field */}
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="User Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Attendance Records */}
            <FormField
              control={form.control}
              name="attendances"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendance Records</FormLabel>
                  {field.value.map((attendance, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex space-x-2">
                        {/* Date Field */}
                        <Input
                          type="date"
                          value={attendance.date || ''}
                          onChange={(e) =>
                            form.setValue(`attendances.${index}.date`, e.target.value, {
                              shouldValidate: true,
                            })
                          }
                        />

                        <Select
                          onValueChange={(value) =>
                            form.setValue(`attendances.${index}.status`, value as Status, {
                              shouldValidate: true,
                            })
                          }
                          value={attendance.status || ''}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={Status.PRESENT}>Present</SelectItem>
                            <SelectItem value={Status.VACATION}>Vacation</SelectItem>
                            <SelectItem value={Status.SICK_LEAVE}>Sick Leave</SelectItem>
                            <SelectItem value={Status.BEREAVEMENT}>Bereavement</SelectItem>
                            <SelectItem value={Status.ABSENT}>Absent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                  {/* Add Record Button */}
                  <Button
                    type="button"
                    onClick={() =>
                      form.setValue('attendances', [
                        ...field.value,
                        { date: '', status: Status.PRESENT },
                      ])
                    }
                  >
                    Add Record
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="w-full">
                {initialValues ? 'Save Changes' : 'Save Attendance'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAttendanceDialog;
