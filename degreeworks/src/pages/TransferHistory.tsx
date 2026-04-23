import { transferHistory } from '../data/mockData';

const RPI_COURSE_COLORS: Record<string, string> = {
  'CSCI': '#3b82f6',
  'MATH': '#8b5cf6',
  'PHYS': '#22c55e',
  'CHEM': '#f59e0b',
  'BIOL': '#10b981',
  'ARTS': '#ec4899',
  'COMM': '#f97316',
};

function getCourseColor(code: string): string {
  const prefix = code.split(' ')[0];
  return RPI_COURSE_COLORS[prefix] ?? '#6b7280';
}

function ModalityBadge({ modality }: { modality: string }) {
  const cfg = {
    'in-person': { label: 'In Person', color: '#16a34a', bg: '#dcfce7', border: '#86efac' },
    'online':    { label: 'Online',    color: '#2563eb', bg: '#dbeafe', border: '#93c5fd' },
    'hybrid':    { label: 'Hybrid',    color: '#d97706', bg: '#fef3c7', border: '#fcd34d' },
  }[modality] ?? { label: modality, color: '#555', bg: '#f3f4f6', border: '#e5e5e5' };

  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
    }}>
      {cfg.label}
    </span>
  );
}

export default function TransferHistory() {
  const totalApplied = transferHistory.reduce((s, c) => s + c.creditsReceived, 0);
  const maxTransfer = 32;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Summary card */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5', padding: '16px 20px' }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Transfer Credit Summary</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{totalApplied}</div>
            <div style={{ fontSize: 12, color: '#888' }}>credits received</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#9ca3af' }}>{maxTransfer}</div>
            <div style={{ fontSize: 12, color: '#888' }}>max transferable</div>
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', background: '#f3f4f6', marginBottom: 4 }}>
              <div style={{ width: `${(totalApplied / maxTransfer) * 100}%`, background: '#22c55e' }} />
            </div>
            <div style={{ fontSize: 12, color: '#555' }}>
              {totalApplied} / {maxTransfer} credits applied ({Math.round((totalApplied / maxTransfer) * 100)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Transfer cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {transferHistory.map((row, i) => {
          const color = getCourseColor(row.rpiCode);
          return (
            <div
              key={i}
              style={{
                background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5',
                borderLeft: `5px solid ${color}`, overflow: 'hidden',
                transition: 'box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ padding: '14px 18px' }}>
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 2 }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color }}>{row.rpiCode}</span>
                      <span style={{ fontWeight: 500, fontSize: 14, color: '#1a1a1a' }}>{row.title}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#888' }}>
                      {row.institution}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <span style={{
                      fontWeight: 700, fontSize: 16,
                      color, background: color + '15',
                      padding: '2px 10px', borderRadius: 8,
                    }}>
                      {row.creditsReceived} cr
                    </span>
                    <ModalityBadge modality={row.modality} />
                  </div>
                </div>

                {/* Detail row */}
                <div style={{
                  display: 'flex', gap: 24, flexWrap: 'wrap',
                  padding: '10px 14px', background: '#fafafa', borderRadius: 6,
                  fontSize: 12, color: '#555',
                }}>
                  <div>
                    <div style={{ color: '#aaa', fontSize: 11, marginBottom: 2 }}>External Course Code</div>
                    <div style={{ fontWeight: 600, color: '#333' }}>{row.externalCode}</div>
                  </div>
                  <div>
                    <div style={{ color: '#aaa', fontSize: 11, marginBottom: 2 }}>From Institution</div>
                    <div style={{ fontWeight: 500 }}>{row.institution}</div>
                  </div>
                  <div>
                    <div style={{ color: '#aaa', fontSize: 11, marginBottom: 2 }}>Year Received</div>
                    <div style={{ fontWeight: 500 }}>{row.yearReceived}</div>
                  </div>
                  <div>
                    <div style={{ color: '#aaa', fontSize: 11, marginBottom: 2 }}>Format</div>
                    <div><ModalityBadge modality={row.modality} /></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {transferHistory.length === 0 && (
        <div style={{
          background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5',
          padding: 40, textAlign: 'center', color: '#aaa', fontSize: 14,
        }}>
          No transfer credits on file
        </div>
      )}
    </div>
  );
}
