// ─── My Contacts ─────────────────────────────────────────────────────────────
// Cohort — Immediate Media Sales OS
// Alicia's agency & client contacts

export interface MyContact {
  name: string;
  role: string;
  agency: string;
  email: string;
  phone: string;
  relationship: 'strong' | 'good' | 'developing' | 'cold';
  lastContact: string;
}

export const myContacts: MyContact[] = [
  // ── Starcom ──
  {
    name: 'Oliver Trent',
    role: 'Client Director',
    agency: 'Starcom',
    email: 'oliver.trent@starcomww.com',
    phone: '+44 20 7946 0321',
    relationship: 'strong',
    lastContact: '2026-04-15',
  },
  {
    name: 'Hannah Birch',
    role: 'Digital Lead',
    agency: 'Starcom',
    email: 'hannah.birch@starcomww.com',
    phone: '+44 20 7946 0322',
    relationship: 'good',
    lastContact: '2026-04-10',
  },
  {
    name: 'Rebecca Foyle',
    role: 'Senior Planner',
    agency: 'Starcom',
    email: 'rebecca.foyle@starcomww.com',
    phone: '+44 20 7946 0323',
    relationship: 'good',
    lastContact: '2026-04-12',
  },
  {
    name: 'Karen Lee',
    role: 'Head of Investment',
    agency: 'Starcom',
    email: 'karen.lee@starcomww.com',
    phone: '+44 20 7946 0324',
    relationship: 'strong',
    lastContact: '2026-04-16',
  },
  // ── Zenith ──
  {
    name: 'Nathan Cross',
    role: 'Account Director',
    agency: 'Zenith',
    email: 'nathan.cross@zenithmedia.com',
    phone: '+44 20 7946 0410',
    relationship: 'good',
    lastContact: '2026-04-03',
  },
  {
    name: 'Aimee Sutherland',
    role: 'Digital Planner',
    agency: 'Zenith',
    email: 'aimee.sutherland@zenithmedia.com',
    phone: '+44 20 7946 0411',
    relationship: 'developing',
    lastContact: '2026-03-20',
  },
  {
    name: 'Sophie Brennan',
    role: 'Investment Manager',
    agency: 'Zenith',
    email: 'sophie.brennan@zenithmedia.com',
    phone: '+44 20 7946 0412',
    relationship: 'developing',
    lastContact: '2026-04-12',
  },
  // ── Spark Foundry ──
  {
    name: 'Nina Okafor',
    role: 'Account Director',
    agency: 'Spark Foundry',
    email: 'nina.okafor@sparkfoundryww.com',
    phone: '+44 20 7946 0510',
    relationship: 'strong',
    lastContact: '2026-04-10',
  },
  {
    name: 'Daniel Reeves',
    role: 'Digital Strategist',
    agency: 'Spark Foundry',
    email: 'daniel.reeves@sparkfoundryww.com',
    phone: '+44 20 7946 0511',
    relationship: 'good',
    lastContact: '2026-03-28',
  },
  {
    name: 'Hannah Clarke',
    role: 'Planning Manager',
    agency: 'Spark Foundry',
    email: 'hannah.clarke@sparkfoundryww.com',
    phone: '+44 20 7946 0512',
    relationship: 'developing',
    lastContact: '2026-04-16',
  },
  // ── Digitas ──
  {
    name: 'Sarah Millward',
    role: 'Account Director',
    agency: 'Digitas',
    email: 'sarah.millward@digitas.com',
    phone: '+44 20 7946 0610',
    relationship: 'good',
    lastContact: '2026-04-04',
  },
  {
    name: 'Kieran Walsh',
    role: 'Planning Lead',
    agency: 'Digitas',
    email: 'kieran.walsh@digitas.com',
    phone: '+44 20 7946 0611',
    relationship: 'developing',
    lastContact: '2026-03-28',
  },
  {
    name: 'Marcus Thorne',
    role: 'Head of Partnerships',
    agency: 'Digitas',
    email: 'marcus.thorne@digitas.com',
    phone: '+44 20 7946 0612',
    relationship: 'cold',
    lastContact: '2026-02-14',
  },
];
