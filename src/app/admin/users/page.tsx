'use client';

import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Search, Mail } from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';

interface UserRecord {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  recipesFavorited: number;
  recipesCompleted: number;
  joined: string;
}

export default function AdminUsersPage() {
  const { showToast } = useNotification();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<UserRecord[]>([
    {
      uid: 'u_1',
      name: 'Krushi Admin',
      email: 'admin@damayantitechnologies.com',
      role: 'admin',
      recipesFavorited: 12,
      recipesCompleted: 35,
      joined: '2026-01-01',
    },
    {
      uid: 'u_2',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      role: 'user',
      recipesFavorited: 8,
      recipesCompleted: 14,
      joined: '2026-01-14',
    },
    {
      uid: 'u_3',
      name: 'Suresh Reddy',
      email: 'suresh.reddy@example.com',
      role: 'user',
      recipesFavorited: 15,
      recipesCompleted: 9,
      joined: '2026-01-22',
    },
    {
      uid: 'u_4',
      name: 'Ananya Verma',
      email: 'ananya.v@example.com',
      role: 'user',
      recipesFavorited: 4,
      recipesCompleted: 6,
      joined: '2026-02-02',
    },
  ]);

  const handleToggleRole = (uid: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.uid === uid) {
          const newRole = u.role === 'admin' ? 'user' : 'admin';
          showToast(`User ${u.name} role changed to ${newRole}.`, 'info');
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-charcoal">
          User Account Directory
        </h2>
        <p className="text-xs text-charcoal-muted mt-0.5">
          Manage registered culinary learners, administrators, and role permissions.
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#EAE7DF] shadow-subtle flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="w-3.5 h-3.5 text-charcoal-muted absolute left-3 top-2.5" />
        </div>
        <span className="text-xs text-charcoal-muted font-medium">
          {filtered.length} registered users
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-[#EAE7DF] overflow-hidden shadow-subtle">
        <table className="w-full text-left text-xs text-charcoal">
          <thead className="bg-[#FAF8F2] border-b border-[#EAE7DF] uppercase text-[10px] tracking-wider text-charcoal-muted font-bold">
            <tr>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Saved / Cooked</th>
              <th className="py-3 px-4">Joined</th>
              <th className="py-3 px-4 text-right">Role Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1EFEA]">
            {filtered.map((user) => (
              <tr key={user.uid} className="hover:bg-sage-50/50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sage-100 text-deep-green flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-charcoal">{user.name}</p>
                      <p className="text-[11px] text-charcoal-muted flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    user.role === 'admin'
                      ? 'bg-deep-green text-white'
                      : 'bg-sage-100 text-deep-green border border-sage-200'
                  }`}>
                    {user.role === 'admin' ? <ShieldCheck className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                    {user.role}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <span className="font-semibold">{user.recipesFavorited} favs</span> •{' '}
                  <span className="text-emerald-700 font-semibold">{user.recipesCompleted} cooked</span>
                </td>

                <td className="py-3 px-4 text-charcoal-muted font-mono">
                  {user.joined}
                </td>

                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleToggleRole(user.uid)}
                    className="text-xs font-semibold text-deep-green hover:underline"
                  >
                    Toggle to {user.role === 'admin' ? 'User' : 'Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
