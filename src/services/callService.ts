import type { CallSettings } from '../types/models'

const STORAGE_KEY = 'peershield_call_settings'

export const DEFAULT_CALL_SETTINGS: CallSettings = {
  campusSupportNumber: '', // Unset by default to adhere to rule: "If no configured support number exists: Do not display a fake number. Instead show: Campus support number has not been configured."
  campusSupportLabel: 'Campus Wellbeing & Security Liaison',
  trustedContactName: '',
  trustedContactNumber: ''
}

export function getCallSettings(): CallSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CallSettings) : DEFAULT_CALL_SETTINGS
  } catch {
    return DEFAULT_CALL_SETTINGS
  }
}

export function saveCallSettings(settings: CallSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (err) {
    console.error('Failed to save call settings:', err)
  }
}

export function initiateCall(phoneNumber: string): void {
  if (!phoneNumber.trim()) return
  window.location.href = `tel:${encodeURIComponent(phoneNumber.trim())}`
}
