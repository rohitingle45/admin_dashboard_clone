export type UserStatus = 'active' | 'inactive';
export type PayrollStatus = 'Completed' | 'Pending';

export interface User {
  name: string;
  id: string;
  mobile: string;
  gender: string;
  country: string;
  activity: string;
  email: string;
  status: UserStatus;
  avatarUrl?: string;
}

export interface Employee {
  name: string;
  id: string;
  department: string;
  designation: string;
  type: string;
  activity: string;
  email: string;
  status: UserStatus;
  avatarUrl?: string;
}

export interface Payroll {
  name: string;
  id: string;
  ctc: string;
  salaryPerMonth: string;
  deduction: string;
  status: PayrollStatus;
  email: string;
  avatarUrl?: string;
}

export interface TableColumn<T = any> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

export interface Job {
  title: string;
  department: string;
  tags: string[];
  location: string;
  salary: string;
  status?: 'active' | 'inactive' | 'completed';
}
