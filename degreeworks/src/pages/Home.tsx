import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  student,
  csRequirements, mathRequirements, itwsRequirements,
  mathScienceRequirements, hassRequirements, archRequirements,
  pathwayRequirements, concentrationRequirements, freeElectives,
  requirementOptions,
  type CourseStatus, type Course, type CourseOption,
} from '../data/mockData';

const TABS = ['Overview', 'CS Major', 'Math Major', 'ITWS Minor', 'Math/Science', 'HASS', 'Arch', 'Pathway', 'Concentration', 'Free'];

const TAB_META: Record<string, { color: string; empty?: boolean }> = {
  'CS Major':     { color: '#3b82f6' },
  'Math Major':   { color: '#3b82f6' },
  'ITWS Minor':   { color: '#3b82f6' },
  'Math/Science': { color: '#22c55e' },
  HASS:           { color: '#3b82f6' },
  Arch:           { color: '#ef4444', empty: true },
  Pathway:        { color: '#3b82f6' },
  Concentration:  { color: '#22c55e' },
  Free:           { color: '#3b82f6' },
};

function StatusDot({ status }: { status: CourseStatus }) {
  if (status === 'complete') return <span className="status-dot dot-complete" />;
  if (status === 'inprogress') return <span className="dot-inprogress" />;
  return <span className="dot-incomplete" />;
}

const STATUS_LEGEND: { color: string; label: string; empty?: boolean }[] = [
  { color: '#22c55e', label: 'Complete' },
  { color: '#3b82f6', label: 'In-progress' },
  { color: '#ef4444', label: 'Incomplete', empty: true },
];

function Legend() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {STATUS_LEGEND.map(({ color, label, empty }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
            background: empty ? 'transparent' : color,
            border: empty ? `2px solid ${color}` : 'none',
          }} />
          <span style={{ fontSize: 12, color: '#555' }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ complete, inProgress, incomplete, total }: {
  complete: number; inProgress: number; incomplete: number; total: number;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', background: '#f3f4f6' }}>
        <div style={{ width: `${(complete / total) * 100}%`, background: '#22c55e' }} />
        <div style={{ width: `${(inProgress / total) * 100}%`, background: '#3b82f6' }} />
        <div style={{ width: `${(incomplete / total) * 100}%`, background: '#ef4444' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <Legend />
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#666' }}>
          <span><strong style={{ color: '#22c55e' }}>{complete} cr</strong> complete</span>
          <span><strong style={{ color: '#3b82f6' }}>{inProgress} cr</strong> in-progress</span>
          <span><strong style={{ color: '#ef4444' }}>{incomplete} cr</strong> remaining</span>
        </div>
      </div>
    </div>
  );
}

function MiniBar({ complete, inProgress, incomplete, total }: { complete: number; inProgress: number; incomplete: number; total: number }) {
  return (
    <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', background: '#f3f4f6' }}>
      <div style={{ width: `${(complete / total) * 100}%`, background: '#22c55e' }} />
      <div style={{ width: `${(inProgress / total) * 100}%`, background: '#3b82f6' }} />
      <div style={{ width: `${(incomplete / total) * 100}%`, background: '#ef4444' }} />
    </div>
  );
}

// Card for one incomplete requirement slot, showing all options that can satisfy it
function IncompleteOptionCard({ course }: { course: Course }) {
  const options: CourseOption[] = requirementOptions[course.code] ?? [
    { code: course.code, title: course.title, credits: course.credits, offeredIn: 'See schedule' },
  ];
  const isGeneric = options.length > 1;

  return (
    <div style={{
      border: '1px solid #fde8e8',
      borderLeft: '4px solid #ef4444',
      borderRadius: 8,
      background: '#fff',
      overflow: 'hidden',
    }}>
      {/* Slot header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', background: '#fff9f9', borderBottom: '1px solid #fde8e8',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot-incomplete" />
          <span style={{ fontWeight: 600, fontSize: 13, color: '#b91c1c' }}>{course.code}</span>
          <span style={{ fontSize: 13, color: '#555' }}>{course.title}</span>
          {isGeneric && (
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 10,
              background: '#fef3c7', color: '#d97706', border: '1px solid #fde68a',
            }}>
              CHOOSE ONE
            </span>
          )}
        </div>
        <span style={{ fontSize: 12, color: '#999' }}>{course.credits} cr required</span>
      </div>

      {/* Options */}
      <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: isGeneric ? 0 : 6 }}>
        {isGeneric ? (
          // Multiple-choice slot: show as a list of options
          <div>
            <div style={{ fontSize: 11, color: '#888', marginBottom: 6, fontWeight: 500 }}>
              Any of the following will satisfy this requirement:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {options.map((opt, i) => (
                <div
                  key={opt.code}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 0,
                    padding: '7px 0',
                    borderBottom: i < options.length - 1 ? '1px solid #f5f5f5' : 'none',
                  }}
                >
                  <div style={{ width: 28, flexShrink: 0 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 18, height: 18, borderRadius: '50%',
                      border: '1.5px solid #d1d5db', fontSize: 10, color: '#9ca3af',
                    }}>
                      {i + 1}
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 500, fontSize: 13, color: '#1a1a1a' }}>{opt.code}</span>
                    <span style={{ fontSize: 13, color: '#555', marginLeft: 8 }}>{opt.title}</span>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: 12 }}>
                    <span style={{
                      fontSize: 11, color: '#555', padding: '2px 8px', borderRadius: 10,
                      background: '#f3f4f6', display: 'inline-block',
                    }}>
                      {opt.offeredIn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Single required course: show with sections
          options.map(opt => (
            <div key={opt.code}>
              {/* Meta row */}
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#666', marginBottom: opt.sections ? 8 : 0, flexWrap: 'wrap' }}>
                <span>
                  <span style={{ color: '#aaa' }}>Offered: </span>
                  <strong style={{ color: '#333' }}>{opt.offeredIn}</strong>
                </span>
                {opt.prereqs && (
                  <span>
                    <span style={{ color: '#aaa' }}>Prereqs: </span>
                    <strong style={{ color: '#333' }}>{opt.prereqs}</strong>
                  </span>
                )}
              </div>

              {/* Sections table */}
              {opt.sections && opt.sections.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, color: '#888', fontWeight: 500, marginBottom: 4 }}>
                    Available sections
                  </div>
                  <div style={{
                    border: '1px solid #f0f0f0', borderRadius: 6, overflow: 'hidden',
                  }}>
                    {opt.sections.map((sec, si) => (
                      <div
                        key={sec.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '7px 12px', fontSize: 12,
                          background: si % 2 === 0 ? '#fff' : '#fafafa',
                          borderBottom: si < (opt.sections?.length ?? 0) - 1 ? '1px solid #f0f0f0' : 'none',
                        }}
                      >
                        <span style={{
                          fontWeight: 600, fontSize: 11, color: '#fff',
                          background: '#6b7280', padding: '1px 6px', borderRadius: 4, flexShrink: 0,
                        }}>
                          Sec {sec.id}
                        </span>
                        <span style={{ color: '#333', flex: 1 }}>{sec.professor}</span>
                        <span style={{ color: '#777', flexShrink: 0 }}>{sec.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function RequirementsView({ title, requirements, totalCredits, onNavigate, navigateLabel }: {
  title: string;
  requirements: Course[];
  totalCredits: number;
  accentColor?: string;
  onNavigate?: () => void;
  navigateLabel?: string;
}) {
  const complete   = requirements.filter(c => c.status === 'complete').reduce((s, c) => s + c.credits, 0);
  const inProgress = requirements.filter(c => c.status === 'inprogress').reduce((s, c) => s + c.credits, 0);
  const incomplete = requirements.filter(c => c.status === 'incomplete').reduce((s, c) => s + c.credits, 0);
  const applied    = complete + inProgress;

  const doneCourses       = requirements.filter(c => c.status !== 'incomplete');
  const incompleteCourses = requirements.filter(c => c.status === 'incomplete');

  const allComplete  = incomplete === 0 && inProgress === 0;
  const noneStarted  = complete === 0 && inProgress === 0;

  return (
    <div>
      {/* Header + badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>{title}</h2>
        {allComplete
          ? <span style={{ fontSize: 11, fontWeight: 600, color: '#22c55e', border: '1.5px solid #22c55e', padding: '1px 7px', borderRadius: 4 }}>COMPLETE</span>
          : noneStarted
          ? <span style={{ fontSize: 11, fontWeight: 600, color: '#ef4444', border: '1.5px solid #ef4444', padding: '1px 7px', borderRadius: 4 }}>NOT STARTED</span>
          : <span className="badge-inprogress">IN-PROGRESS</span>
        }
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 20 }}>
        <ProgressBar complete={complete} inProgress={inProgress} incomplete={incomplete} total={totalCredits} />
        <div style={{ fontSize: 13, color: '#555', marginTop: 6 }}>
          {applied} / {totalCredits} credits applied ({Math.round((applied / totalCredits) * 100)}%)
        </div>
      </div>

      {/* Completed / In-Progress table */}
      {doneCourses.length > 0 && (
        <table style={{ marginBottom: incompleteCourses.length ? 24 : 0 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
              {['Status', 'Course Code', 'Title', 'Grade', 'Credits', 'Term'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, fontSize: 13 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doneCourses.map(c => (
              <tr key={c.code} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '10px 12px' }}><StatusDot status={c.status} /></td>
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{c.code}</td>
                <td style={{ padding: '10px 12px' }}>{c.title}</td>
                <td style={{ padding: '10px 12px', color: '#555' }}>{c.grade || '—'}</td>
                <td style={{ padding: '10px 12px' }}>{c.credits}</td>
                <td style={{ padding: '10px 12px', color: '#555' }}>{c.term || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Incomplete requirements — options view */}
      {incompleteCourses.length > 0 && (
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#b91c1c' }}>
              Remaining Requirements
            </span>
            <span style={{
              fontSize: 11, background: '#fee2e2', color: '#b91c1c',
              padding: '1px 8px', borderRadius: 10, fontWeight: 500,
            }}>
              {incompleteCourses.length} course{incompleteCourses.length !== 1 ? 's' : ''} · {incomplete} cr
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {incompleteCourses.map(c => (
              <IncompleteOptionCard key={c.code} course={c} />
            ))}
          </div>
        </div>
      )}

      {onNavigate && navigateLabel && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <button
            onClick={onNavigate}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              border: '1px solid #ddd', borderRadius: 6, padding: '8px 16px',
              fontWeight: 500, color: '#333', fontSize: 13, cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f9f9f9'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            {navigateLabel} ›
          </button>
        </div>
      )}
    </div>
  );
}

const TAB_CONFIGS: Record<string, { title: string; reqs: Course[]; total: number; navigate?: string }> = {
  'CS Major':     { title: 'Computer Science Major Requirements', reqs: csRequirements,           total: 28 },
  'Math Major':   { title: 'Mathematics Major Requirements',      reqs: mathRequirements,          total: 24 },
  'ITWS Minor':   { title: 'ITWS Minor Requirements',             reqs: itwsRequirements,          total: 20 },
  'Math/Science': { title: 'Math / Science Requirements',         reqs: mathScienceRequirements,   total: 32 },
  'HASS':         { title: 'HASS Requirements',                   reqs: hassRequirements,          total: 32 },
  'Arch':         { title: 'Architecture Requirements',           reqs: archRequirements,          total: 16 },
  'Pathway':      { title: 'HASS Pathway Requirements',           reqs: pathwayRequirements,       total: 16 },
  'Concentration':{ title: 'Concentration Requirements',          reqs: concentrationRequirements, total: 16 },
  'Free':         { title: 'Free Electives',                      reqs: freeElectives,             total: 15 },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  const creditsPct     = Math.round((student.credits.earned / student.credits.required) * 100);
  const inProgressCredits = 16;
  const remaining      = student.credits.required - student.credits.earned - inProgressCredits;
  const earnedPct      = (student.credits.earned / student.credits.required) * 100;
  const inProgressPct  = (inProgressCredits / student.credits.required) * 100;
  const remainingPct   = (remaining / student.credits.required) * 100;

  const programCards = [
    { tab: 'CS Major',   label: 'Computer Science Major',              degree: 'BS Computer Science', type: 'Major', reqs: csRequirements,  total: 28 },
    { tab: 'Math Major', label: 'Mathematics Major',                   degree: 'BS Mathematics',       type: 'Major', reqs: mathRequirements, total: 24 },
    { tab: 'ITWS Minor', label: 'Information Technology & Web Science', degree: 'ITWS Minor',          type: 'Minor', reqs: itwsRequirements, total: 20 },
  ];

  const cfg = TAB_CONFIGS[activeTab];

  return (
    <div style={{ width: '100%' }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 0, background: '#fff',
        borderRadius: '8px 8px 0 0', borderBottom: '1px solid #e5e5e5',
        padding: '0 16px', flexWrap: 'wrap',
      }}>
        {TABS.map(tab => {
          const meta = TAB_META[tab];
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 14px', fontSize: 13, fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? '#1a1a1a' : '#555',
                borderBottom: activeTab === tab ? '2px solid var(--rpi-red)' : '2px solid transparent',
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#1a1a1a'; }}
              onMouseLeave={e => { e.currentTarget.style.color = activeTab === tab ? '#1a1a1a' : '#555'; }}
            >
              {meta && (
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: meta.empty ? 'transparent' : meta.color,
                  border: meta.empty ? `1.5px solid ${meta.color}` : 'none',
                  display: 'inline-block',
                }} />
              )}
              {tab}
            </button>
          );
        })}
      </div>

      <div style={{ background: '#fff', borderRadius: '0 0 8px 8px', padding: 20, border: '1px solid #e5e5e5', borderTop: 'none' }}>

        {/* ── Overview ── */}
        {activeTab === 'Overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Degree overview card */}
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Degree Overview</h2>
              <div style={{ display: 'flex', border: '1px solid #e5e5e5', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ flex: 3, padding: 16, borderRight: '1px solid #e5e5e5' }}>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Total Credits</div>
                  <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
                    {student.credits.earned} / {student.credits.required}
                    <span style={{ fontWeight: 400, fontSize: 14, color: '#777', marginLeft: 6 }}>({creditsPct}%)</span>
                  </div>
                  <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', background: '#f3f4f6', marginBottom: 8 }}>
                    <div style={{ width: `${earnedPct}%`, background: '#22c55e' }} />
                    <div style={{ width: `${inProgressPct}%`, background: '#3b82f6' }} />
                    <div style={{ width: `${remainingPct}%`, background: '#ef4444' }} />
                  </div>
                  <Legend />
                </div>
                <div style={{ flex: 1, padding: 16, borderRight: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>GPA</div>
                  <div style={{ fontWeight: 700, fontSize: 28 }}>{student.gpa}</div>
                </div>
                <div style={{ flex: 2, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 2 }}>Advisor</div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{student.advisor.name}</div>
                  <button
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
                      border: '1px solid #ddd', borderRadius: 6, padding: '6px 14px',
                      color: 'var(--rpi-red)', fontWeight: 500, fontSize: 13, cursor: 'pointer',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fce8eb'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    ✉ Message
                  </button>
                </div>
              </div>
            </div>

            {/* Programs of Study */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600 }}>Programs of Study</h2>
                <button
                  onClick={() => navigate('/whatif')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    border: '1px solid #ddd', borderRadius: 6, padding: '6px 14px',
                    color: '#555', fontWeight: 500, fontSize: 13, cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f9f9f9'; e.currentTarget.style.borderColor = '#aaa'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#ddd'; }}
                >
                  ✦ What If I Changed My Major?
                </button>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {programCards.map(p => {
                  const done = p.reqs.filter(c => c.status === 'complete').reduce((s, c) => s + c.credits, 0);
                  const inp  = p.reqs.filter(c => c.status === 'inprogress').reduce((s, c) => s + c.credits, 0);
                  const inc  = p.reqs.filter(c => c.status === 'incomplete').reduce((s, c) => s + c.credits, 0);
                  const pct  = Math.round(((done + inp) / p.total) * 100);
                  return (
                    <div
                      key={p.tab}
                      onClick={() => setActiveTab(p.tab)}
                      style={{
                        flex: 1, border: '1px solid #e5e5e5', borderRadius: 8,
                        padding: 16, cursor: 'pointer', borderTop: '3px solid #3b82f6',
                        transition: 'box-shadow 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
                          color: '#3b82f6', background: '#eff6ff',
                          padding: '2px 8px', borderRadius: 10, textTransform: 'uppercase',
                        }}>
                          {p.type}
                        </span>
                        <span className="badge-inprogress" style={{ fontSize: 10 }}>IN-PROGRESS</span>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{p.degree}</div>
                      <div style={{ fontSize: 12, color: '#777', marginBottom: 12 }}>{p.label}</div>
                      <MiniBar complete={done} inProgress={inp} incomplete={inc} total={p.total} />
                      <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>
                        <strong>{done + inp}</strong> / {p.total} cr applied ({pct}%)
                      </div>
                      {inc > 0 && (
                        <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>
                          {p.reqs.filter(c => c.status === 'incomplete').length} courses remaining — click to see options
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Student Profile */}
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Student Profile</h2>
              <div style={{ border: '1px solid #e5e5e5', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5' }}>
                  <div style={{ flex: 1, padding: 16, borderRight: '1px solid #e5e5e5' }}>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Identity</div>
                    <div style={{ fontSize: 13 }}><strong>Name:</strong> {student.name}</div>
                    <div style={{ fontSize: 13 }}><strong>RIN:</strong> {student.rin}</div>
                  </div>
                  <div style={{ flex: 2, padding: 16 }}>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Enrolled Programs</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {programCards.map(p => (
                        <div key={p.tab} style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
                          <strong>{p.degree}</strong>
                          <span style={{ color: '#888', fontSize: 12 }}>— {p.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: 1, padding: 16, borderRight: '1px solid #e5e5e5' }}>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Status</div>
                    <div style={{ fontSize: 13 }}><strong>Level:</strong> {student.level}</div>
                    <div style={{ fontSize: 13 }}><strong>Class:</strong> {student.classYear}</div>
                  </div>
                  <div style={{ flex: 2, padding: 16 }}>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Support</div>
                    <div style={{ fontSize: 13 }}><strong>Advisor:</strong> {student.advisor.name}</div>
                    <div style={{ fontSize: 13 }}><strong>Email:</strong> {student.advisor.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Requirement tabs ── */}
        {cfg && (
          <RequirementsView
            title={cfg.title}
            requirements={cfg.reqs}
            totalCredits={cfg.total}
            onNavigate={cfg.navigate ? () => setActiveTab(cfg.navigate!) : undefined}
            navigateLabel={cfg.navigate ? `See ${cfg.navigate}` : undefined}
          />
        )}
      </div>
    </div>
  );
}
