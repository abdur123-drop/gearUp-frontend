import type { LucideIcon } from "lucide-react"

export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN"
export type UserStatus = "ACTIVE" | "SUSPENDED"
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED"
export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED"
  | "PAID"
export type GearCondition = "NEW" | "EXCELLENT" | "GOOD" | "FAIR" | "POOR"

export type ApiResponse<T> = {
  success: boolean
  statusCode?: number
  message: string
  data?: T
  meta?: PaginationMeta
}

export type ActionState = {
  success: boolean
  message: string
  fieldErrors?: Record<string, string>
}

export type User = {
  id: string
  name: string
  email: string
  role: Role
  status: UserStatus
  phone?: string | null
  address?: string | null
  createdAt: string
  updatedAt: string
}

export type Category = {
  id: string
  name: string
  description?: string | null
  craetedAt: string
  updatedAt: string
}

export type GearItem = {
  id: string
  name: string
  description: string
  brand?: string | null
  pricePerDay: number
  stock: number
  availableStock: number
  condition: GearCondition
  isAvailable: boolean
  providerId: string
  categoryId: string
  provider?: User
  category?: Category
  createdAt: string
  updatedAt: string
}

export type RentalOrder = {
  id: string
  customerId: string
  gearItemId: string
  quantity: number
  startDate: string
  endDate: string
  totalAmount: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  customer?: User
  gearItem?: GearItem
  createdAt: string
  updatedAt: string
}

export type Payment = {
  id: string
  rentalOrderId: string
  customerId: string
  sessionId: string
  amount: number
  provider: string
  status: PaymentStatus
  paidAt?: string | null
  createdAt: string
  updatedAt: string
}

export type Review = {
  id: string
  customerId: string
  gearItemId: string
  rentalOrderId: string
  rating: number
  comment?: string | null
  createdAt: string
  updatedAt: string
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

