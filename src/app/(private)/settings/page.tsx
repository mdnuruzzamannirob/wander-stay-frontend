'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Bell, Camera, Eye, EyeOff, KeyRound, Mail, MapPin, Phone, Save, User } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import ButtonComp from '@/components/shared/ButtonComp';
import { useAppSelector } from '@/store/hook';

export default function SettingsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  /* ─── Profile state ─── */
  const [profileSaving, setProfileSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });

  /* ─── Password state ─── */
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  /* ─── Notification state ─── */
  const [notifSaving, setNotifSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    bookingEmails: true,
    promotionEmails: false,
  });

  // Simulate loading user data
  useEffect(() => {
    const t = setTimeout(() => {
      setProfile({
        name: user?.name ?? 'John Doe',
        email: user?.email ?? 'john@example.com',
        phone: user?.phone ?? '+1 (212) 555-0199',
        location: user?.location ?? 'New York, USA',
      });
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, [user]);

  /* ─── Handlers ─── */
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setProfileSaving(false);
    toast.success('Profile updated successfully!');
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setPasswordSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setPasswordSaving(false);
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    toast.success('Password changed successfully!');
  };

  const handleNotificationToggle = async (key: 'bookingEmails' | 'promotionEmails') => {
    setNotifSaving(true);
    const newVal = !notifications[key];
    await new Promise((r) => setTimeout(r, 400));
    setNotifications((prev) => ({ ...prev, [key]: newVal }));
    setNotifSaving(false);
    toast.success('Notification preferences updated');
  };

  return (
    <>
      <PageHero
        title="Account Settings"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Settings' }]}
      />

      <section className="app-container space-y-10 py-16 sm:py-20">
        {/* ─── Profile Section ─── */}
        <div className="rounded-2xl border bg-white p-5 sm:p-7">
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
              <User className="text-primary size-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold sm:text-lg">Profile Information</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Update your personal details
              </p>
            </div>
          </div>

          {isLoading ? (
            <ProfileSectionSkeleton />
          ) : (
            <form onSubmit={handleProfileSave} className="space-y-4 sm:space-y-5">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary flex size-16 items-center justify-center rounded-full text-xl font-bold sm:size-20 sm:text-2xl">
                  {profile.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .toUpperCase()}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition hover:bg-gray-50 sm:text-sm"
                >
                  <Camera className="size-4" /> Change Photo
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SettingsInput
                  label="Full Name"
                  icon={<User className="size-4" />}
                  value={profile.name}
                  onChange={(v) => setProfile({ ...profile, name: v })}
                  placeholder="John Doe"
                />
                <SettingsInput
                  label="Email Address"
                  icon={<Mail className="size-4" />}
                  value={profile.email}
                  onChange={(v) => setProfile({ ...profile, email: v })}
                  type="email"
                  placeholder="john@example.com"
                  disabled
                />
                <SettingsInput
                  label="Phone Number"
                  icon={<Phone className="size-4" />}
                  value={profile.phone}
                  onChange={(v) => setProfile({ ...profile, phone: v })}
                  placeholder="+1 (212) 555-0199"
                />
                <SettingsInput
                  label="Location"
                  icon={<MapPin className="size-4" />}
                  value={profile.location}
                  onChange={(v) => setProfile({ ...profile, location: v })}
                  placeholder="City, Country"
                />
              </div>

              <div className="flex justify-end pt-1">
                <ButtonComp
                  type="submit"
                  loading={profileSaving}
                  loadingText="Saving..."
                  className="gap-2"
                >
                  <Save className="size-4" /> Save Changes
                </ButtonComp>
              </div>
            </form>
          )}
        </div>

        {/* ─── Password Section ─── */}
        <div className="rounded-2xl border bg-white p-5 sm:p-7">
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
              <KeyRound className="text-primary size-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold sm:text-lg">Change Password</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Ensure your account stays secure
              </p>
            </div>
          </div>

          {isLoading ? (
            <PasswordSectionSkeleton />
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4 sm:space-y-5">
              <PasswordInput
                label="Current Password"
                value={passwords.oldPassword}
                show={showOld}
                onToggle={() => setShowOld(!showOld)}
                onChange={(v) => setPasswords({ ...passwords, oldPassword: v })}
                placeholder="Enter current password"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <PasswordInput
                  label="New Password"
                  value={passwords.newPassword}
                  show={showNew}
                  onToggle={() => setShowNew(!showNew)}
                  onChange={(v) => setPasswords({ ...passwords, newPassword: v })}
                  placeholder="Enter new password"
                />
                <PasswordInput
                  label="Confirm Password"
                  value={passwords.confirmPassword}
                  show={showConfirm}
                  onToggle={() => setShowConfirm(!showConfirm)}
                  onChange={(v) => setPasswords({ ...passwords, confirmPassword: v })}
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex justify-end pt-1">
                <ButtonComp
                  type="submit"
                  loading={passwordSaving}
                  loadingText="Changing..."
                  className="gap-2"
                >
                  <KeyRound className="size-4" /> Change Password
                </ButtonComp>
              </div>
            </form>
          )}
        </div>

        {/* ─── Notification Section ─── */}
        <div className="rounded-2xl border bg-white p-5 sm:p-7">
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
              <Bell className="text-primary size-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold sm:text-lg">Email Notifications</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Manage what emails you receive
              </p>
            </div>
          </div>

          {isLoading ? (
            <NotificationSectionSkeleton />
          ) : (
            <div className="space-y-4">
              <NotificationRow
                title="Booking Notifications"
                description="Receive email updates about your bookings, confirmations, and check-in reminders"
                enabled={notifications.bookingEmails}
                saving={notifSaving}
                onToggle={() => handleNotificationToggle('bookingEmails')}
              />
              <NotificationRow
                title="Promotions & Deals"
                description="Get notified about exclusive hotel deals, seasonal offers, and travel promotions"
                enabled={notifications.promotionEmails}
                saving={notifSaving}
                onToggle={() => handleNotificationToggle('promotionEmails')}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ───────── Sub-components ───────── */

function SettingsInput({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-muted-foreground mb-1.5 block text-xs font-medium sm:text-sm">
        {label}
      </label>
      <div className="relative">
        <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="h-10 w-full rounded-lg border bg-gray-50 pr-4 pl-9 text-sm transition outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 sm:h-11"
        />
      </div>
    </div>
  );
}

function PasswordInput({
  label,
  value,
  show,
  onToggle,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-muted-foreground mb-1.5 block text-xs font-medium sm:text-sm">
        {label}
      </label>
      <div className="relative">
        <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
          <KeyRound className="size-4" />
        </span>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className="h-10 w-full rounded-lg border bg-gray-50 pr-10 pl-9 text-sm transition outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-200 sm:h-11"
        />
        <button
          type="button"
          onClick={onToggle}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}

function NotificationRow({
  title,
  description,
  enabled,
  saving,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  saving: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border bg-gray-50 p-4 sm:p-5">
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium sm:text-base">{title}</h3>
        <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">{description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        disabled={saving}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 disabled:opacity-50 ${
          enabled ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block size-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

/* ───────── Inline skeletons ───────── */

function ProfileSectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4 sm:space-y-5">
      <div className="flex items-center gap-4">
        <div className="size-16 rounded-full bg-gray-200 sm:size-20" />
        <div className="h-9 w-32 rounded-lg bg-gray-200" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="mb-1.5 h-4 w-24 rounded bg-gray-100" />
            <div className="h-10 w-full rounded-lg bg-gray-100 sm:h-11" />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <div className="h-10 w-32 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

function PasswordSectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4 sm:space-y-5">
      <div>
        <div className="mb-1.5 h-4 w-32 rounded bg-gray-100" />
        <div className="h-10 w-full rounded-lg bg-gray-100 sm:h-11" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i}>
            <div className="mb-1.5 h-4 w-28 rounded bg-gray-100" />
            <div className="h-10 w-full rounded-lg bg-gray-100 sm:h-11" />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <div className="h-10 w-40 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

function NotificationSectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 rounded-xl border bg-gray-50 p-4 sm:p-5"
        >
          <div className="flex-1 space-y-2">
            <div className="h-4 w-36 rounded bg-gray-200" />
            <div className="h-3 w-64 rounded bg-gray-100" />
          </div>
          <div className="h-6 w-11 rounded-full bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
