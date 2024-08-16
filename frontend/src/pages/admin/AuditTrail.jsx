// import React, { useEffect, useState } from 'react';
// //import { getAuditTrailApi } from '../apis/api'; // Make sure this API call is implemented



// const AuditTrail = () => {
//   const [auditLogs, setAuditLogs] = useState([]);

//   useEffect(() => {
//     // Fetch the audit trail data from the API
//     getAuditTrailApi()
//       .then((res) => {
//         setAuditLogs(res.data.auditLogs); // Assuming API response contains auditLogs
//       })
//       .catch((err) => {
//         console.error('Error fetching audit logs:', err);
//       });
//   }, []);

//   return (
//     <div className="audit-trail">
//       <h1>Audit Trail</h1>
//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead className="table-dark">
//             <tr>
//               <th>Date</th>
//               <th>User</th>
//               <th>Action</th>
//               <th>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {auditLogs.map((log, index) => (
//               <tr key={index}>
//                 <td>{new Date(log.date).toLocaleString()}</td>
//                 <td>{log.user}</td>
//                 <td>{log.action}</td>
//                 <td>{log.details}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AuditTrail;
