import { useState } from 'react';
import { transferInstitutions } from '../data/mockData';

const PER_PAGE = 6;

export default function TransferFindCollege() {
  const [institutionSearch, setInstitutionSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [stateFilter, setStateFilter] = useState('NY');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = transferInstitutions.filter(inst => {
    const matchInst = !institutionSearch || inst.name.toLowerCase().includes(institutionSearch.toLowerCase());
    const matchCity = !citySearch || inst.city.toLowerCase().includes(citySearch.toLowerCase());
    const matchState = !stateFilter || inst.state === stateFilter;
    return matchInst && matchCity && matchState;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div style={{ width: '100%' }}>
      {/* Search filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <SearchBox value={institutionSearch} onChange={setInstitutionSearch} placeholder="Enter an Institution" />
        <SearchBox value={citySearch} onChange={setCitySearch} placeholder="Enter a City" />
        <div style={{
          flex: 1, minWidth: 120,
          display: 'flex', alignItems: 'center',
          border: '1px solid #ddd', borderRadius: 6, padding: '6px 10px',
          background: '#fff', gap: 6,
        }}>
          <span style={{ flex: 1, fontSize: 13 }}>
            {stateFilter ? (
              <span style={{
                background: '#f0f0f0', borderRadius: 4, padding: '2px 8px',
                fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                {stateFilter}
                <button onClick={() => setStateFilter('')} style={{ fontSize: 11, color: '#888' }}>✕</button>
              </span>
            ) : (
              <input
                placeholder="Enter a State"
                value={stateFilter}
                onChange={e => setStateFilter(e.target.value.toUpperCase())}
                style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, width: '100%' }}
              />
            )}
          </span>
          <span style={{ color: '#aaa' }}>⌕</span>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5', overflow: 'hidden' }}>
        <table>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
              {['Institution', 'City', 'State'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 600, fontSize: 13 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((inst, i) => (
              <>
                <tr
                  key={inst.name}
                  onClick={() => setExpanded(expanded === inst.name ? null : inst.name)}
                  style={{
                    borderBottom: expanded === inst.name ? 'none' : '1px solid #f0f0f0',
                    cursor: 'pointer',
                    background: expanded === inst.name ? '#fce8eb' : i % 2 === 0 ? '#fff' : '#fafafa',
                  }}
                >
                  <td style={{ padding: '12px 16px', fontWeight: expanded === inst.name ? 600 : 400, color: expanded === inst.name ? 'var(--rpi-red)' : '#1a1a1a' }}>{inst.name}</td>
                  <td style={{ padding: '12px 16px', color: expanded === inst.name ? 'var(--rpi-red)' : '#555' }}>{inst.city}</td>
                  <td style={{ padding: '12px 16px', color: expanded === inst.name ? 'var(--rpi-red)' : '#555' }}>{inst.state}</td>
                </tr>
                {expanded === inst.name && inst.courses.length > 0 && (
                  <tr key={inst.name + '-exp'} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td colSpan={3} style={{ padding: 0 }}>
                      <table style={{ width: '100%', background: '#fff' }}>
                        <thead>
                          <tr style={{ background: '#fce8eb', borderBottom: '1px solid #f5c0c8' }}>
                            <th style={{ textAlign: 'left', padding: '8px 16px', fontWeight: 700, fontSize: 12 }}>RPI Course Code</th>
                            <th style={{ textAlign: 'left', padding: '8px 16px', fontWeight: 700, fontSize: 12 }}>RPI Course Title</th>
                            <th style={{ textAlign: 'left', padding: '8px 16px', fontWeight: 700, fontSize: 12 }}>
                              {inst.name.split(' ')[0]} Course Code
                              <button
                                onClick={() => setExpanded(null)}
                                style={{ float: 'right', fontSize: 14, color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}
                              >
                                ∨
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {inst.courses.map((c, j) => (
                            <tr key={j} style={{ borderBottom: '1px solid #f8f0f0' }}>
                              <td style={{ padding: '10px 16px', fontSize: 13 }}>{c.rpiCode}</td>
                              <td style={{ padding: '10px 16px', fontSize: 13 }}>{c.rpiTitle}</td>
                              <td style={{ padding: '10px 16px', fontSize: 13 }}>{c.extCode}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
                {expanded === inst.name && inst.courses.length === 0 && (
                  <tr key={inst.name + '-empty'} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td colSpan={3} style={{ padding: '12px 16px', color: '#aaa', fontSize: 13 }}>
                      No transfer equivalencies on file
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '12px 16px', borderTop: '1px solid #f0f0f0' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: page === i + 1 ? 'var(--rpi-red)' : 'transparent',
                color: page === i + 1 ? '#fff' : '#555',
                border: 'none', fontWeight: page === i + 1 ? 600 : 400,
                cursor: 'pointer', fontSize: 13,
              }}
            >
              {i + 1}
            </button>
          ))}
          {page < totalPages && (
            <button onClick={() => setPage(p => p + 1)} style={{ color: '#555', fontSize: 16, background: 'none', border: 'none', cursor: 'pointer' }}>›</button>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div style={{
      flex: 1, minWidth: 160,
      display: 'flex', alignItems: 'center',
      border: '1px solid #ddd', borderRadius: 6, padding: '6px 10px',
      background: '#fff', gap: 6,
    }}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13 }}
      />
      <span style={{ color: '#aaa' }}>⌕</span>
    </div>
  );
}
