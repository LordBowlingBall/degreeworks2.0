import { transferHistory } from '../data/mockData';

export default function TransferHistory() {
  const totalApplied = transferHistory.reduce((s, c) => s + c.creditsReceived, 0);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Transfer History</div>
          <div style={{ fontSize: 13, color: '#666' }}>
            {totalApplied} / 32 credits applied ({Math.round((totalApplied / 32) * 100)}%)
          </div>
        </div>
        <table>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
              {['RPI Code', 'Title', 'External Code', 'Institution', 'Credits Received', 'Year Received'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 600, fontSize: 13 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transferHistory.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{row.rpiCode}</td>
                <td style={{ padding: '12px 16px' }}>{row.title}</td>
                <td style={{ padding: '12px 16px', color: '#555' }}>{row.externalCode}</td>
                <td style={{ padding: '12px 16px', color: '#555' }}>{row.institution}</td>
                <td style={{ padding: '12px 16px' }}>{row.creditsReceived}</td>
                <td style={{ padding: '12px 16px', color: '#555' }}>{row.yearReceived}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
