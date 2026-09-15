import React from 'react';

export const ProfileSettings: React.FC = () => {
  return (
    <div style={{ background: '#fff', border: '1px solid #DCE5EF', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0B2A4A', marginBottom: '1rem' }}>
        Profile & Account
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#EBF5FF', color: '#087FEA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700 }}>
          JD
        </div>
        <div>
          <div style={{ fontWeight: 600, color: '#0B2A4A', fontSize: '0.9rem' }}>Dr. John Doe</div>
          <div style={{ color: '#5a7184', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Principal Scientist • john.doe@incois.gov.in</div>
          <button style={{ background: '#fff', border: '1px solid #DCE5EF', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, color: '#0B2A4A', cursor: 'pointer' }}>
            Change Avatar
          </button>
        </div>
      </div>
      
      <hr style={{ border: 'none', borderTop: '1px solid #F0F4F8', margin: '1.5rem 0' }} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#5a7184', fontWeight: 600, marginBottom: '0.4rem' }}>First Name</label>
          <input type="text" defaultValue="John" style={{ width: '100%', padding: '0.6rem', border: '1px solid #DCE5EF', borderRadius: '6px', fontSize: '0.85rem' }} disabled />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#5a7184', fontWeight: 600, marginBottom: '0.4rem' }}>Last Name</label>
          <input type="text" defaultValue="Doe" style={{ width: '100%', padding: '0.6rem', border: '1px solid #DCE5EF', borderRadius: '6px', fontSize: '0.85rem' }} disabled />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#5a7184', fontWeight: 600, marginBottom: '0.4rem' }}>Email Address</label>
          <input type="email" defaultValue="john.doe@incois.gov.in" style={{ width: '100%', padding: '0.6rem', border: '1px solid #DCE5EF', borderRadius: '6px', fontSize: '0.85rem' }} disabled />
        </div>
      </div>
    </div>
  );
};
