import { supabase } from '../lib/supabaseClient';

export default function TestDataPage({ data }) {
  return (
    <div>
      <h1>Supabase Data</h1>
      <ul>
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item.id}>{item.title}</li> // Change 'name' to your column name
          ))
        ) : (
          <p>No data found</p>
        )}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
    const { data, error } = await supabase.from('testtable').select('*');
    
    if (error) {
      console.error('Error fetching data:', error);
      return { props: { data: [] } };
    }
  
    if (!data || data.length === 0) {
      console.log('No data found');
    }
  
    return { props: { data } };
  }
  