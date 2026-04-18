import { useState } from 'react';
import { transferCourses } from '../data/mockData';

const PER_PAGE = 6;

export default function TransferFindCourse() {
  const [keywordSearch, setKeywordSearch] = useState('');
  const [codeSearch, setCodeSearch] = useState('');
  const [instSearch, setInstSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = transferCourses.filter(c => {
    const matchKeyword = !keywordSearch || c.rpiTitle.toLowerCase().includes(keywordSearch.toLowerCase());
    const matchCode = !codeSearch || c.rpiCode.toLowerCase().includes(codeSearch.toLowerCase());
    const matchInst = !instSearch || c.universities.some(u => u.name.toLowerCase().includes(instSearch.toLowerCase()));
    return matchKeyword && matchCode && matchInst;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div style={{ width: '100%' }}>
      {/* Search filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <SearchBox value={keywordSearch} onChange={setKeywordSearch} placeholder="Enter a Keyword" />
        <SearchBox value={codeSearch} onChange={setCodeSearch} placeholder="Enter a Course Code" />
        <SearchBox value={instSearch} onChange={setInstSearch} placeholder="Enter an Institution" />
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5', overflow: 'hidden' }}>
        <table>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
              {['RPI Course Code', 'RPI Course Title', 'Number of Credits'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 600, fontSize: 13 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((c, i) => (
              <>
                <tr
                  key={c.rpiCode}
                  onClick={() => setExpanded(expanded === c.rpiCode ? null : c.rpiCode)}
                  style={{
                    borderBottom: expanded === c.rpiCode && c.universities.length > 0 ? 'none' : '1px solid #f0f0f0',
                    cursor: 'pointer',
                    background: expanded === c.rpiCode ? '#fce8eb' : i % 2 === 0 ? '#fff' : '#f9f9f9',
                  }}
                >
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: expanded === c.rpiCode ? 'var(--rpi-red)' : '#1a1a1a' }}>{c.rpiCode}</td>
                  <td style={{ padding: '12px 16px', color: expanded === c.rpiCode ? 'var(--rpi-red)' : '#555' }}>{c.rpiTitle}</td>
                  <td style={{ padding: '12px 16px', color: expanded === c.rpiCode ? 'var(--rpi-red)' : '#555' }}>{c.credits}</td>
                </tr>
                {expanded === c.rpiCode && c.universities.length > 0 && (
                  <tr key={c.rpiCode + '-exp'} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td colSpan={3} style={{ padding: 0 }}>
                      <table style={{ width: '100%', background: '#fff' }}>
                        <thead>
                          <tr style={{ background: '#fce8eb', borderBottom: '1px solid #f5c0c8' }}>
                            <th style={{ textAlign: 'left', padding: '8px 16px', fontWeight: 700, fontSize: 12 }}>University Name</th>
                            <th style={{ textAlign: 'left', padding: '8px 16px', fontWeight: 700, fontSize: 12 }}>University Course Code</th>
                            <th style={{ textAlign: 'left', padding: '8px 16px', fontWeight: 700, fontSize: 12 }}>
                              Number of Credits
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
                          {c.universities.map((u, j) => (
                            <tr key={j} style={{ borderBottom: '1px solid #f8f0f0' }}>
                              <td style={{ padding: '10px 16px', fontSize: 13 }}>{u.name}</td>
                              <td style={{ padding: '10px 16px', fontSize: 13 }}>{u.extCode}</td>
                              <td style={{ padding: '10px 16px', fontSize: 13 }}>{u.credits}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
