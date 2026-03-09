import type { Payroll, PayrollStatus } from '../types';

export const mockPayrollData: Payroll[] = [
  { 
    name: "John Doe", 
    id: "EMP001", 
    ctc: "$45,000",
    salaryPerMonth: "$7,083",
    deduction: "$850",
    status: 'Completed',
    email: "john.doe@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  { 
    name: "Jane Smith", 
    id: "EMP002", 
    ctc: "$78,000",
    salaryPerMonth: "$7,667",
    deduction: "$920",
    status: 'Completed',
    email: "jane.smith@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  { 
    name: "Robert Johnson", 
    id: "EMP003", 
    ctc: "$60,000",
    salaryPerMonth: "$6,500",
    deduction: "$780",
    status: 'Completed',
    email: "robert.j@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  { 
    name: "Emily Davis", 
    id: "EMP004", 
    ctc: "$34,000",
    salaryPerMonth: "$8,750",
    deduction: "$1,050",
    status: 'Pending',
    email: "emily.d@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  { 
    name: "Michael Wilson", 
    id: "EMP005", 
    ctc: "$40,000",
    salaryPerMonth: "$5,667",
    deduction: "$680",
    status: 'Completed',
    email: "michael.w@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  { 
    name: "Sarah Brown", 
    id: "EMP006", 
    ctc: "$45,000",
    salaryPerMonth: "$7,333",
    deduction: "$880",
    status: 'Completed',
    email: "sarah.b@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  { 
    name: "David Taylor", 
    id: "EMP007", 
    ctc: "$5,000",
    salaryPerMonth: "$7,917",
    deduction: "$950",
    status: 'Completed',
    email: "david.t@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  { 
    name: "Emma Martinez", 
    id: "EMP008", 
    ctc: "$60,000",
    salaryPerMonth: "$6,000",
    deduction: "$720",
    status: 'Pending',
    email: "emma.m@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  { 
    name: "James Anderson", 
    id: "EMP009", 
    ctc: "$25,000",
    salaryPerMonth: "$9,167",
    deduction: "$1,100",
    status: 'Completed',
    email: "james.a@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  { 
    name: "Olivia Thomas", 
    id: "EMP010", 
    ctc: "$30,000",
    salaryPerMonth: "$6,833",
    deduction: "$820",
    status: 'Completed',
    email: "olivia.t@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  { 
    name: "William Jackson", 
    id: "EMP011", 
    ctc: "$78,000",
    salaryPerMonth: "$6,333",
    deduction: "$760",
    status: 'Completed',
    email: "william.j@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/6.jpg"
  },
  { 
    name: "Sophia White", 
    id: "EMP012", 
    ctc: "$45,000",
    salaryPerMonth: "$8,167",
    deduction: "$980",
    status: 'Pending',
    email: "sophia.w@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  { 
    name: "Daniel Harris", 
    id: "EMP013", 
    ctc: "$85,000",
    salaryPerMonth: "$7,083",
    deduction: "$850",
    status: 'Completed',
    email: "daniel.h@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/7.jpg"
  },
  { 
    name: "Isabella Martin", 
    id: "EMP014", 
    ctc: "$115,000",
    salaryPerMonth: "$9,583",
    deduction: "$1,150",
    status: 'Completed',
    email: "isabella.m@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/7.jpg"
  },
  { 
    name: "Joseph Thompson", 
    id: "EMP015", 
    ctc: "$70,000",
    salaryPerMonth: "$5,833",
    deduction: "$700",
    status: 'Completed',
    email: "joseph.t@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/8.jpg"
  },
  { 
    name: "Mia Garcia", 
    id: "EMP016", 
    ctc: "$90,000",
    salaryPerMonth: "$7,500",
    deduction: "$900",
    status: 'Pending',
    email: "mia.g@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  { 
    name: "Christopher Martinez", 
    id: "EMP017", 
    ctc: "$80,000",
    salaryPerMonth: "$6,667",
    deduction: "$800",
    status: 'Completed',
    email: "christopher.m@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/9.jpg"
  },
  { 
    name: "Charlotte Robinson", 
    id: "EMP018", 
    ctc: "$100,000",
    salaryPerMonth: "$8,333",
    deduction: "$1,000",
    status: 'Completed',
    email: "charlotte.r@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/9.jpg"
  },
  { 
    name: "Andrew Clark", 
    id: "EMP019", 
    ctc: "$75,000",
    salaryPerMonth: "$6,250",
    deduction: "$750",
    status: 'Completed',
    email: "andrew.c@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/10.jpg"
  },
  { 
    name: "Amelia Rodriguez", 
    id: "EMP020", 
    ctc: "$87,000",
    salaryPerMonth: "$7,250",
    deduction: "$870",
    status: 'Pending',
    email: "amelia.r@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/10.jpg"
  }
];

// Generate additional payroll data to reach 50 records
const statuses: PayrollStatus[] = ['Completed', 'Pending'];
const baseSalaries = [65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000];

for (let i = 21; i <= 50; i++) {
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const baseSalary = baseSalaries[Math.floor(Math.random() * baseSalaries.length)];
  const id = `EMP${i.toString().padStart(3, '0')}`;
  const name = `Employee ${i}`;
  const email = `employee${i}@example.com`;
  const deduction = Math.round(baseSalary * 0.01);
  const ctc = `$${baseSalary.toLocaleString()}`;
  const salaryPerMonth = `$${Math.round(baseSalary / 12).toLocaleString()}`;
  const deductionStr = `$${deduction.toLocaleString()}`;
  const avatarNumber = (i % 20) + 1;
  
  mockPayrollData.push({
    name,
    id,
    ctc,
    salaryPerMonth,
    deduction: deductionStr,
    status,
    email,
    avatarUrl: `https://randomuser.me/api/portraits/${gender.toLowerCase() === 'male' ? 'men' : 'women'}/${avatarNumber}.jpg`
  });
}

export default mockPayrollData;
