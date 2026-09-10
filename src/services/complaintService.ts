import type { Complaint, ComplaintCategory, ComplaintPriority, ComplaintStatus } from '../types/models'
import { addProgress, getProgress } from '../storage'

const STORAGE_KEY = 'peershield_complaints'

// Seed illustrative demo data for category-wise view if none exists
const DEMO_COMPLAINTS: Complaint[] = [
  {
    id: 'demo-1',
    referenceId: 'PS-2026-1048',
    category: 'Peer Pressure',
    description: 'Hostel corridor pressure to participate in late-night substance rounds.',
    location: 'Hostel Block B, 3rd Floor',
    date: '2026-09-08',
    priority: 'High',
    status: 'Action Taken',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-08 14:20', note: 'Complaint received through anonymous box.' },
      { status: 'Under Review', timestamp: '2026-09-08 16:00', note: 'Reviewed by campus wellbeing committee.' },
      { status: 'Action Planned', timestamp: '2026-09-09 10:30', note: 'Wardens alerted; PeerShield champion peer circles scheduled.' },
      { status: 'Action Taken', timestamp: '2026-09-09 18:00', note: 'Night warden rounds initiated; anonymous check-in poster installed.' }
    ],
    isDemo: true
  },
  {
    id: 'demo-2',
    referenceId: 'PS-2026-2104',
    category: 'Substance Availability',
    description: 'Unlicensed vendor selling unregulated smoking products near north gate during evening hours.',
    location: 'North Campus Gate Boundary',
    date: '2026-09-07',
    priority: 'High',
    status: 'Under Review',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-07 18:45', note: 'Anonymous report submitted.' },
      { status: 'Under Review', timestamp: '2026-09-08 09:15', note: 'Forwarded to campus security liaison.' }
    ],
    isDemo: true
  },
  {
    id: 'demo-3',
    referenceId: 'PS-2026-3392',
    category: 'Stress / Anxiety',
    description: 'Multiple students feeling intense exam anxiety and lack of access to quiet decompression areas.',
    location: 'Central Library Floor 2',
    date: '2026-09-06',
    priority: 'Medium',
    status: 'Action Planned',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-06 11:10', note: 'Student report submitted.' },
      { status: 'Under Review', timestamp: '2026-09-06 14:00', note: 'Wellbeing counsellor reviewed.' },
      { status: 'Action Planned', timestamp: '2026-09-07 11:00', note: 'Extended quiet zone and peer support hours scheduled.' }
    ],
    isDemo: true
  },
  {
    id: 'demo-4',
    referenceId: 'PS-2026-4412',
    category: 'Unsafe Campus Area',
    description: 'Poor lighting along the pathway between the engineering lab and sports pavilion.',
    location: 'East Wing Walkway',
    date: '2026-09-05',
    priority: 'High',
    status: 'Resolved',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-05 20:15' },
      { status: 'Under Review', timestamp: '2026-09-06 09:00' },
      { status: 'Action Planned', timestamp: '2026-09-06 14:30' },
      { status: 'Action Taken', timestamp: '2026-09-07 16:00', note: 'Campus maintenance installed 4 new LED solar fixtures.' },
      { status: 'Resolved', timestamp: '2026-09-08 10:00', note: 'Pathway inspected and lit.' }
    ],
    isDemo: true
  },
  {
    id: 'demo-5',
    referenceId: 'PS-2026-5581',
    category: 'Bullying',
    description: 'Exclusionary pressure and mockery aimed at first-year students who abstain from social drinking.',
    location: 'Cafeteria Common Area',
    date: '2026-09-04',
    priority: 'Medium',
    status: 'Action Planned',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-04 13:20' },
      { status: 'Under Review', timestamp: '2026-09-05 10:00' },
      { status: 'Action Planned', timestamp: '2026-09-06 15:00', note: 'Anti-ragging and peer culture workshop planned with student council.' }
    ],
    isDemo: true
  },
  {
    id: 'demo-6',
    referenceId: 'PS-2026-6630',
    category: 'Peer Pressure',
    description: 'Off-campus party invitations tied to club initiation with peer pressure to vape.',
    location: 'Off-campus student apartments',
    date: '2026-09-03',
    priority: 'High',
    status: 'Action Taken',
    timeline: [
      { status: 'Submitted', timestamp: '2026-09-03 22:00' },
      { status: 'Under Review', timestamp: '2026-09-04 09:30' },
      { status: 'Action Taken', timestamp: '2026-09-05 12:00', note: 'Club leadership briefed on university non-coercion policy.' }
    ],
    isDemo: true
  }
]

export function getStoredComplaints(): Complaint[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_COMPLAINTS))
      return DEMO_COMPLAINTS
    }
    return JSON.parse(raw) as Complaint[]
  } catch {
    return DEMO_COMPLAINTS
  }
}

export function saveComplaints(complaints: Complaint[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints))
  } catch (err) {
    console.error('Failed to save complaints to localStorage:', err)
  }
}

export function generateReferenceId(): string {
  const year = new Date().getFullYear()
  const randomNum = Math.floor(1000 + Math.random() * 9000)
  return `PS-${year}-${randomNum}`
}

export function submitComplaint(params: {
  category: ComplaintCategory
  description: string
  location?: string
  contactPreference?: string
  priority?: ComplaintPriority
}): Complaint {
  const current = getStoredComplaints()
  const now = new Date()
  const timestamp = `${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  const referenceId = generateReferenceId()

  const newComplaint: Complaint = {
    id: `comp-${Date.now()}`,
    referenceId,
    category: params.category,
    description: params.description,
    location: params.location?.trim() || undefined,
    date: now.toISOString().slice(0, 10),
    contactPreference: params.contactPreference?.trim() || undefined,
    priority: params.priority || 'Medium',
    status: 'Submitted',
    timeline: [
      {
        status: 'Submitted',
        timestamp,
        note: 'Complaint registered securely. Reference ID generated for tracking.'
      }
    ]
  }

  const updated = [newComplaint, ...current]
  saveComplaints(updated)
  addProgress({ reports: getProgress().reports + 1 })
  return newComplaint
}

export function findComplaintByReference(refId: string): Complaint | undefined {
  const complaints = getStoredComplaints()
  const cleanRef = refId.trim().toUpperCase()
  return complaints.find((c) => c.referenceId.toUpperCase() === cleanRef)
}

export function updateComplaintStatus(
  referenceId: string,
  newStatus: ComplaintStatus,
  actionNote?: string
): boolean {
  const complaints = getStoredComplaints()
  const index = complaints.findIndex((c) => c.referenceId.toUpperCase() === referenceId.toUpperCase())
  if (index === -1) return false

  const now = new Date()
  const timestamp = `${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

  const updatedTimeline = [
    ...complaints[index].timeline,
    {
      status: newStatus,
      timestamp,
      note: actionNote?.trim() || `Status updated to ${newStatus}.`
    }
  ]

  complaints[index] = {
    ...complaints[index],
    status: newStatus,
    timeline: updatedTimeline
  }

  saveComplaints(complaints)
  return true
}

export interface CategorySummary {
  category: ComplaintCategory
  reportCount: number
  highPriorityCount: number
  statusBreakdown: Record<ComplaintStatus, number>
  dominantPriority: ComplaintPriority
  recentDate: string
}

export function getCategoryWiseSummaries(
  filterStatus?: string,
  filterPriority?: string,
  sourceComplaints?: Complaint[]
): CategorySummary[] {
  let complaints = sourceComplaints ? [...sourceComplaints] : getStoredComplaints()

  if (filterStatus && filterStatus !== 'All') {
    complaints = complaints.filter((c) => c.status === filterStatus)
  }
  if (filterPriority && filterPriority !== 'All') {
    complaints = complaints.filter((c) => c.priority === filterPriority)
  }

  const categories: ComplaintCategory[] = [
    'Peer Pressure',
    'Substance Availability',
    'Stress / Anxiety',
    'Bullying',
    'Harassment',
    'Unsafe Campus Area',
    'Academic Pressure',
    'Social Pressure',
    'Other'
  ]

  return categories.map((category) => {
    const list = complaints.filter((c) => c.category === category)
    const reportCount = list.length
    const highPriorityCount = list.filter((c) => c.priority === 'High' || c.priority === 'Critical').length

    const statusBreakdown: Record<ComplaintStatus, number> = {
      Submitted: 0,
      'Under Review': 0,
      'Action Planned': 0,
      'Action Taken': 0,
      Resolved: 0,
      'Requires More Information': 0
    }

    list.forEach((item) => {
      if (statusBreakdown[item.status] !== undefined) {
        statusBreakdown[item.status]++
      }
    })

    let dominantPriority: ComplaintPriority = 'Low'
    if (highPriorityCount > 0) dominantPriority = 'High'
    else if (list.some((c) => c.priority === 'Medium')) dominantPriority = 'Medium'

    const recentDate = list.length > 0
      ? list.map((c) => c.date).sort().reverse()[0]
      : 'N/A'

    return {
      category,
      reportCount,
      highPriorityCount,
      statusBreakdown,
      dominantPriority,
      recentDate
    }
  })
}
