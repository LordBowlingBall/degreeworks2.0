import { useState, type ReactElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Icons: Record<string, ReactElement> = {
  home: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  ),
  whatif: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 7 12 12 15 15"/>
    </svg>
  ),
  transfer: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3l4 4-4 4"/>
      <path d="M3 7h18"/>
      <path d="M7 21l-4-4 4-4"/>
      <path d="M21 17H3"/>
    </svg>
  ),
  user: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
};

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: 'home' },
  { label: 'What If?', path: '/whatif', icon: 'whatif' },
  {
    label: 'Scheduling', path: '/scheduling', icon: 'calendar',
    children: [
      { label: 'This Semester', path: '/scheduling/current' },
      { label: 'Plan Future', path: '/scheduling/future' },
    ],
  },
  { label: 'History', path: '/history', icon: 'clock' },
  {
    label: 'Transfer Overview', path: '/transfer', icon: 'transfer',
    children: [
      { label: 'Transfer History', path: '/transfer/history' },
      {
        label: 'Find Classes', path: '/transfer/find',
        children: [
          { label: 'By College', path: '/transfer/find/college' },
          { label: 'By Course', path: '/transfer/find/course' },
        ],
      },
    ],
  },
];

const SIDEBAR_WIDTH = '200px';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    '/scheduling': location.pathname.startsWith('/scheduling'),
    '/transfer': location.pathname.startsWith('/transfer'),
    '/transfer/find': location.pathname.startsWith('/transfer/find'),
  });

  const toggle = (path: string) =>
    setOpenSections(s => ({ ...s, [path]: !s[path] }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        height: 'var(--header-height)', background: '#fff',
        borderBottom: '1px solid #e5e5e5', display: 'flex',
        alignItems: 'center', padding: 0,
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      }}>
        <div style={{
          width: SIDEBAR_WIDTH, fontWeight: 800,
          fontSize: 22, fontFamily: 'Georgia, serif',
          borderRight: '1px solid #e5e5e5',
          padding: '0 16px', height: '100%',
          display: 'flex', alignItems: 'center',
          flexShrink: 0,
        }}>
          <span style={{ borderBottom: '3px solid #1a1a1a', paddingBottom: 1 }}>RPI</span>
        </div>
        <span style={{ fontWeight: 600, fontSize: 18, flex: 1, paddingLeft: 20 }}>DegreeWorks 2.0</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555', paddingRight: 20 }}>
          <span style={{
            width: 32, height: 32, borderRadius: '50%',
            border: '1.5px solid #aaa', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: '#666',
          }}>
            {Icons.user}
          </span>
          <span style={{ fontWeight: 500 }}>John Brown</span>
        </div>
      </header>

      <div style={{ display: 'flex', marginTop: 'var(--header-height)', minHeight: 'calc(100vh - var(--header-height))' }}>
        {/* Sidebar */}
        <nav style={{
          width: SIDEBAR_WIDTH, background: '#fff',
          borderRight: '1px solid #e5e5e5', flexShrink: 0,
          position: 'fixed', top: 'var(--header-height)', bottom: 0,
          overflowY: 'auto', padding: '8px 0',
        }}>
          {NAV_ITEMS.map(item => (
            <SidebarItem
              key={item.path}
              item={item}
              location={location.pathname}
              openSections={openSections}
              toggle={toggle}
              depth={0}
            />
          ))}
        </nav>

        {/* Main content */}
        <main style={{
          marginLeft: SIDEBAR_WIDTH,
          flex: 1, padding: 24,
          background: '#f0f0f0',
          height: 'calc(100vh - var(--header-height))',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}

interface NavItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

function SidebarItem({
  item, location, openSections, toggle, depth,
}: {
  item: NavItem;
  location: string;
  openSections: Record<string, boolean>;
  toggle: (p: string) => void;
  depth: number;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openSections[item.path];
  const isSectionActive = hasChildren && location.startsWith(item.path);

  const indentLeft = depth === 0 ? 16 : depth === 1 ? 36 : 52;
  const fontSize = depth === 0 ? 14 : 13;

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={() => toggle(item.path)}
          style={{
            display: 'flex', alignItems: 'center', width: '100%',
            padding: `10px 12px 10px ${indentLeft}px`,
            gap: 9, fontSize, fontWeight: isSectionActive ? 600 : 400,
            color: isSectionActive ? 'var(--rpi-red)' : '#333',
            background: 'none', border: 'none', cursor: 'pointer',
            textAlign: 'left', transition: 'background 0.1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f5'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
        >
          {item.icon && (
            <span style={{ display: 'flex', alignItems: 'center', opacity: isSectionActive ? 1 : 0.55 }}>
              {Icons[item.icon]}
            </span>
          )}
          <span style={{ flex: 1 }}>{item.label}</span>
          <svg
            width="12" height="12" viewBox="0 0 12 12"
            fill="none" stroke="currentColor" strokeWidth="1.8"
            style={{
              marginRight: 8, flexShrink: 0,
              transform: isOpen ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.2s',
            }}
          >
            <polyline points="4 2 8 6 4 10"/>
          </svg>
        </button>
      ) : (
        <NavLink
          to={item.path}
          end={item.path === '/'}
          style={({ isActive }: { isActive: boolean }) => ({
            display: 'flex', alignItems: 'center',
            padding: `10px 12px 10px ${indentLeft}px`,
            gap: 9, fontSize, fontWeight: isActive ? 600 : 400,
            color: isActive ? 'var(--rpi-red)' : '#333',
            background: isActive ? 'var(--rpi-red-light)' : 'none',
            borderRight: isActive ? '3px solid var(--rpi-red)' : 'none',
            textDecoration: 'none', transition: 'background 0.1s',
          })}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
            if (!e.currentTarget.classList.contains('active')) {
              e.currentTarget.style.background = '#f5f5f5';
            }
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
            if (!e.currentTarget.classList.contains('active')) {
              e.currentTarget.style.background = 'none';
            }
          }}
        >
          {item.icon && (
            <span style={{ display: 'flex', alignItems: 'center', opacity: 0.55 }}>
              {Icons[item.icon]}
            </span>
          )}
          {item.label}
        </NavLink>
      )}

      {hasChildren && isOpen && item.children!.map(child => (
        <SidebarItem
          key={child.path}
          item={child}
          location={location}
          openSections={openSections}
          toggle={toggle}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}
