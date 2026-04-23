import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alternativeMajors, student, type WhatIfMajor, type WhatIfRequirement } from '../data/mockData';

function StatusIcon({ satisfied }: { satisfied: boolean | 'inprogress' }) {
  if (satisfied === true) return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 20, height: 20, borderRadius: '50%', background: '#22c55e', color: '#fff', fontSize: 12,
      flexShrink: 0,
    }}>✓</span>
  );
  if (satisfied === 'inprogress') return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 20, height: 20, borderRadius: '50%', background: '#3b82f6', color: '#fff', fontSize: 10,
      flexShrink: 0,
    }}>⟳</span>
  );
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 20, height: 20, borderRadius: '50%',
      border: '2px solid #e5e5e5', color: '#ccc', fontSize: 14,
      flexShrink: 0,
    }}>○</span>
  );
}

function RequirementRow({ req }: { req: WhatIfRequirement }) {
  const bg = req.satisfied === true ? '#f0fdf4' : req.satisfied === 'inprogress' ? '#eff6ff' : '#fff';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 16px', borderBottom: '1px solid #f0f0f0',
      background: bg,
    }}>
      <StatusIcon satisfied={req.satisfied} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontWeight: 500, fontSize: 13 }}>{req.code}</span>
        <span style={{ color: '#555', fontSize: 13, marginLeft: 10 }}>{req.title}</span>
      </div>
      <span style={{ fontSize: 13, color: '#666', flexShrink: 0 }}>{req.credits} cr</span>
      <span style={{
        fontSize: 11, fontWeight: 600, padding: '1px 8px', borderRadius: 10, flexShrink: 0,
        background: req.satisfied === true ? '#dcfce7' : req.satisfied === 'inprogress' ? '#dbeafe' : '#f3f4f6',
        color: req.satisfied === true ? '#16a34a' : req.satisfied === 'inprogress' ? '#2563eb' : '#9ca3af',
      }}>
        {req.satisfied === true ? 'Satisfied' : req.satisfied === 'inprogress' ? 'In Progress' : 'Not Started'}
      </span>
    </div>
  );
}

function MajorSummary({ major }: { major: WhatIfMajor }) {
  const satisfied = major.requirements.filter(r => r.satisfied === true);
  const inprogress = major.requirements.filter(r => r.satisfied === 'inprogress');
  const missing = major.requirements.filter(r => r.satisfied === false);
  const creditsSatisfied = satisfied.reduce((s, r) => s + r.credits, 0);
  const creditsInProgress = inprogress.reduce((s, r) => s + r.credits, 0);
  const totalApplied = creditsSatisfied + creditsInProgress;
  const pct = Math.round((totalApplied / major.totalCredits) * 100);

  return (
    <div style={{ display: 'flex', gap: 20, padding: '16px 20px', background: '#fafafa', borderRadius: 8, border: '1px solid #e5e5e5', marginBottom: 20 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a' }}>{pct}%</div>
        <div style={{ fontSize: 11, color: '#888' }}>already satisfied</div>
      </div>
      <div style={{ width: 1, background: '#e5e5e5' }} />
      <div style={{ display: 'flex', gap: 16, flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#22c55e' }}>{satisfied.length}</div>
          <div style={{ fontSize: 11, color: '#888' }}>courses done</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#3b82f6' }}>{inprogress.length}</div>
          <div style={{ fontSize: 11, color: '#888' }}>in progress</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#ef4444' }}>{missing.length}</div>
          <div style={{ fontSize: 11, color: '#888' }}>still needed</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>{totalApplied}/{major.totalCredits}</div>
          <div style={{ fontSize: 11, color: '#888' }}>credits applied</div>
        </div>
      </div>
      {/* Mini progress bar */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 120 }}>
        <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', background: '#e5e5e5' }}>
          <div style={{ width: `${(creditsSatisfied / major.totalCredits) * 100}%`, background: '#22c55e' }} />
          <div style={{ width: `${(creditsInProgress / major.totalCredits) * 100}%`, background: '#3b82f6' }} />
        </div>
        <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{totalApplied} of {major.totalCredits} cr</div>
      </div>
    </div>
  );
}

export default function WhatIf() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(alternativeMajors[0].id);
  const selected = alternativeMajors.find(m => m.id === selectedId)!;

  const currentMajors = student.degrees.map(d => d.degree).join(', ');

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{
        background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5',
        padding: '20px 24px', marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <button
                onClick={() => navigate('/')}
                style={{ color: '#888', fontSize: 13, cursor: 'pointer', padding: 0 }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--rpi-red)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#888'; }}
              >
                ← Back to Overview
              </button>
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>What If?</h1>
            <p style={{ fontSize: 13, color: '#666' }}>
              See how your completed courses would apply toward a different major.
              Currently enrolled: <strong>{currentMajors}</strong>
            </p>
          </div>
          <div style={{
            padding: '10px 14px', background: '#fce8eb', borderRadius: 8,
            border: '1px solid #fca5a5', fontSize: 13, color: '#7f1d1d',
            maxWidth: 260,
          }}>
            <strong>Note:</strong> This is a simulation only. Contact your advisor before making any official major changes.
          </div>
        </div>
      </div>

      {/* Major selector + detail */}
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Major selector sidebar */}
        <div style={{
          width: 220, flexShrink: 0, background: '#fff', borderRadius: 8,
          border: '1px solid #e5e5e5', overflow: 'hidden', alignSelf: 'flex-start',
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontSize: 12, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Explore Major
          </div>
          {alternativeMajors.map(m => {
            const satisfied = m.requirements.filter(r => r.satisfied === true || r.satisfied === 'inprogress');
            const pct = Math.round((satisfied.reduce((s, r) => s + r.credits, 0) / m.totalCredits) * 100);
            const isSelected = m.id === selectedId;
            return (
              <div
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                style={{
                  padding: '12px 16px', cursor: 'pointer',
                  background: isSelected ? '#fce8eb' : '#fff',
                  borderLeft: isSelected ? '3px solid var(--rpi-red)' : '3px solid transparent',
                  borderBottom: '1px solid #f0f0f0',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#f9f9f9'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = '#fff'; }}
              >
                <div style={{ fontWeight: 600, fontSize: 13, color: isSelected ? 'var(--rpi-red)' : '#1a1a1a' }}>
                  {m.name}
                </div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>{m.degree}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                  <div style={{ flex: 1, height: 4, borderRadius: 2, overflow: 'hidden', background: '#e5e5e5' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: isSelected ? 'var(--rpi-red)' : '#22c55e' }} />
                  </div>
                  <span style={{ fontSize: 11, color: '#888', flexShrink: 0 }}>{pct}% ready</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5', overflow: 'hidden' }}>
            {/* Major header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#3b82f6', background: '#eff6ff', padding: '2px 10px', borderRadius: 10, display: 'inline-block', marginBottom: 6, textTransform: 'uppercase' }}>
                    What if scenario
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{selected.degree}</h2>
                  <p style={{ fontSize: 13, color: '#666', maxWidth: 500 }}>{selected.description}</p>
                </div>
              </div>
            </div>

            {/* Summary stats */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e5e5' }}>
              <MajorSummary major={selected} />

              {/* Legend */}
              <div style={{ display: 'flex', gap: 16 }}>
                {[
                  { color: '#22c55e', bg: '#f0fdf4', label: 'Already completed — counts toward this major' },
                  { color: '#3b82f6', bg: '#eff6ff', label: 'Currently in progress' },
                  { color: '#9ca3af', bg: '#fff', label: 'Would still need to take' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#555' }}>
                    <div style={{ width: 12, height: 12, borderRadius: 2, background: item.bg, border: `1.5px solid ${item.color}`, flexShrink: 0 }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements list */}
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '20px 1fr 60px 100px',
                gap: 12, padding: '8px 16px',
                fontSize: 11, fontWeight: 600, color: '#888',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                borderBottom: '1px solid #e5e5e5', background: '#fafafa',
              }}>
                <div></div>
                <div>Course</div>
                <div style={{ textAlign: 'right' }}>Credits</div>
                <div style={{ textAlign: 'right' }}>Status</div>
              </div>
              {selected.requirements.map(req => (
                <RequirementRow key={req.code} req={req} />
              ))}
            </div>

            {/* CTA */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e5e5', background: '#fafafa' }}>
              <p style={{ fontSize: 13, color: '#555', marginBottom: 12 }}>
                Interested in switching to <strong>{selected.name}</strong>? Talk to your advisor to discuss how this change would affect your graduation timeline.
              </p>
              <button
                style={{
                  padding: '8px 20px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                  background: 'var(--rpi-red)', color: '#fff', border: 'none', cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Contact Advisor About This Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
