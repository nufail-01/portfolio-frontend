// import { useEffect, useState } from "react";
// import { getCurrentAdmin } from "../../lib/auth/authService";

// const StatCard = ({ title, value, description, icon, accentBg }) => {
//   return (
//     <div
//       className={`group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${
//         accentBg
//           ? "bg-accent shadow-[0_0_30px_-8px_var(--color-accent)]"
//           : "border border-border bg-surface hover:border-accent/30"
//       }`}
//     >
//       <div className="flex items-start justify-between">
//         <p
//           className={`font-mono text-xs tracking-widest ${
//             accentBg ? "text-bg/70" : "text-text-muted"
//           }`}
//         >
//           {title.toUpperCase()}
//         </p>

//         <span
//           className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
//             accentBg ? "bg-bg/10 text-bg" : "bg-bg text-accent"
//           }`}
//         >
//           {icon}
//         </span>
//       </div>

//       <p
//         className={`mt-5 font-display text-4xl tracking-tight ${
//           accentBg ? "text-bg" : "text-text-primary"
//         }`}
//       >
//         {value}
//       </p>

//       <p
//         className={`mt-2 text-xs ${
//           accentBg ? "text-bg/60" : "text-text-muted/70"
//         }`}
//       >
//         {description}
//       </p>
//     </div>
//   );
// };

// const QuickAction = ({ href, label, icon, external }) => (
//   <a
//     href={href}
//     target={external ? "_blank" : undefined}
//     rel={external ? "noreferrer" : undefined}
//     className="group flex items-center justify-between rounded-2xl border border-border bg-bg/50 px-4 py-4 text-sm text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-text-primary"
//   >
//     <span className="flex items-center gap-3">
//       <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-text-muted transition-colors group-hover:text-accent">
//         {icon}
//       </span>
//       {label}
//     </span>

//     <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
//       {external ? "↗" : "→"}
//     </span>
//   </a>
// );

// const ActivityRow = ({
//   title,
//   description,
//   icon,
//   tone = "accent",
//   isLast,
// }) => {
//   const toneStyles = {
//     accent: "bg-accent/15 text-accent",
//     emerald: "bg-emerald-500/15 text-emerald-400",
//   };

//   return (
//     <div
//       className={`flex items-center gap-4 py-4 ${
//         !isLast ? "border-b border-border" : ""
//       }`}
//     >
//       <div
//         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
//           toneStyles[tone]
//         }`}
//       >
//         {icon}
//       </div>

//       <div>
//         <p className="text-sm font-medium text-text-primary">{title}</p>
//         <p className="mt-1 text-xs text-text-muted/70">{description}</p>
//       </div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [admin, setAdmin] = useState(null);

//   useEffect(() => {
//     const loadAdmin = async () => {
//       const data = await getCurrentAdmin();
//       setAdmin(data);
//     };

//     loadAdmin();
//   }, []);

//   return (
//     <div className="mx-auto max-w-7xl">
//       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <p className="mb-1 flex items-center gap-2 font-mono text-sm font-medium text-accent">
//             <span className="h-1.5 w-1.5 rounded-full bg-accent" />
//             Overview
//           </p>

//           <h1 className="font-display text-3xl font-bold text-text-primary">
//             Dashboard
//           </h1>

//           <p className="mt-2 font-mono text-sm text-text-muted">
//             Welcome back
//             {admin?.name ? `, ${admin.name}` : ""}. Here's what's happening
//             with your portfolio.
//           </p>
//         </div>

//         <a
//           href="/admin/projects"
//           className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-mono font-semibold text-bg shadow-[0_0_20px_-6px_var(--color-accent)] transition hover:-translate-y-0.5 hover:bg-accent/90"
//         >
//           + Add Project
//         </a>
//       </div>

//       <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
//         <StatCard
//           title="Total Projects"
//           value="6"
//           description="Portfolio projects"
//           accentBg
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="M4 7h6l2 2h8v10H4z" />
//               <path d="M4 7V5h6l2 2" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Published"
//           value="6"
//           description="Currently visible"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="m5 12 4 4L19 6" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Messages"
//           value="0"
//           description="Contact submissions"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <rect x="3" y="5" width="18" height="14" rx="2" />
//               <path d="m3 7 9 6 9-6" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Status"
//           value="Online"
//           description="Admin system"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <circle cx="12" cy="12" r="9" />
//               <path d="m8 12 3 3 5-6" />
//             </svg>
//           }
//         />
//       </div>

//       <div className="mt-6 grid gap-6 lg:grid-cols-3">
//         <div className="rounded-3xl border border-border bg-surface p-6 lg:col-span-2">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="font-display text-lg font-semibold text-text-primary">
//                 Recent Activity
//               </h2>

//               <p className="mt-1 font-mono text-xs text-text-muted">
//                 Latest portfolio activity
//               </p>
//             </div>
//           </div>

//           <div className="mt-6">
//             <ActivityRow
//               title="Portfolio system ready"
//               description="Admin dashboard connected"
//               tone="accent"
//               icon={
//                 <svg
//                   className="h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M12 5v14M5 12h14" />
//                 </svg>
//               }
//             />

//             <ActivityRow
//               title="Authentication active"
//               description="PHP session authentication is working"
//               tone="emerald"
//               isLast
//               icon={
//                 <svg
//                   className="h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.5"
//                 >
//                   <path d="M20 6L9 17l-5-5" />
//                 </svg>
//               }
//             />
//           </div>
//         </div>

//         <div className="rounded-3xl border border-border bg-surface p-6">
//           <h2 className="font-display text-lg font-semibold text-text-primary">
//             Quick Actions
//           </h2>

//           <div className="mt-5 space-y-3">
//             <QuickAction
//               href="/admin/projects"
//               label="Manage Projects"
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M4 7h6l2 2h8v10H4z" />
//                   <path d="M4 7V5h6l2 2" />
//                 </svg>
//               }
//             />

//             <QuickAction
//               href="/admin/contacts"
//               label="View Messages"
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <rect x="3" y="5" width="18" height="14" rx="2" />
//                   <path d="m3 7 9 6 9-6" />
//                 </svg>
//               }
//             />

//             <QuickAction
//               href="/"
//               label="View Portfolio"
//               external
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <circle cx="12" cy="12" r="9" />
//                   <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
//                 </svg>
//               }
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import { useEffect, useState } from "react";
// import { getCurrentAdmin } from "../../lib/auth/authService";

// const StatCard = ({ title, value, description, icon, accentBg }) => {
//   return (
//     <div
//       className={`group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${
//         accentBg
//           ? "bg-accent shadow-[0_0_30px_-8px_var(--color-accent)]"
//           : "border border-border bg-surface hover:border-accent/30"
//       }`}
//     >
//       <div className="flex items-start justify-between">
//         <p
//           className={`font-mono text-xs tracking-widest ${
//             accentBg ? "text-bg/70" : "text-text-muted"
//           }`}
//         >
//           {title.toUpperCase()}
//         </p>

//         <span
//           className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
//             accentBg ? "bg-bg/10 text-bg" : "bg-bg text-accent"
//           }`}
//         >
//           {icon}
//         </span>
//       </div>

//       <p
//         className={`mt-5 font-display text-4xl tracking-tight ${
//           accentBg ? "text-bg" : "text-text-primary"
//         }`}
//       >
//         {value}
//       </p>

//       <p
//         className={`mt-2 text-xs ${
//           accentBg ? "text-bg/60" : "text-text-muted/70"
//         }`}
//       >
//         {description}
//       </p>
//     </div>
//   );
// };

// const QuickAction = ({ href, label, icon, external }) => (
//   <a
//     href={href}
//     target={external ? "_blank" : undefined}
//     rel={external ? "noreferrer" : undefined}
//     className="group flex items-center justify-between rounded-2xl border border-border bg-bg/50 px-4 py-4 text-sm text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-text-primary"
//   >
//     <span className="flex items-center gap-3">
//       <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-text-muted transition-colors group-hover:text-accent">
//         {icon}
//       </span>
//       {label}
//     </span>

//     <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
//       {external ? "↗" : "→"}
//     </span>
//   </a>
// );

// const ActivityRow = ({
//   title,
//   description,
//   icon,
//   tone = "accent",
//   isLast,
// }) => {
//   const toneStyles = {
//     accent: "bg-accent/15 text-accent",
//     emerald: "bg-emerald-500/15 text-emerald-400",
//   };

//   return (
//     <div
//       className={`flex items-center gap-4 py-4 ${
//         !isLast ? "border-b border-border" : ""
//       }`}
//     >
//       <div
//         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
//           toneStyles[tone] || toneStyles.accent
//         }`}
//       >
//         {icon}
//       </div>

//       <div>
//         <p className="text-sm font-medium text-text-primary">{title}</p>
//         <p className="mt-1 text-xs text-text-muted/70">{description}</p>
//       </div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [admin, setAdmin] = useState(null);

//   useEffect(() => {
//     const loadAdmin = async () => {
//       try {
//         const data = await getCurrentAdmin();
//         setAdmin(data);
//       } catch (error) {
//         console.error("Failed to load admin:", error);
//       }
//     };

//     loadAdmin();
//   }, []);

//   return (
//     <div className="mx-auto max-w-7xl">
//       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <p className="mb-1 flex items-center gap-2 font-mono text-sm font-medium text-accent">
//             <span className="h-1.5 w-1.5 rounded-full bg-accent" />
//             Overview
//           </p>

//           <h1 className="font-display text-3xl font-bold text-text-primary">
//             Dashboard
//           </h1>

//           <p className="mt-2 font-mono text-sm text-text-muted">
//             Welcome back
//             {admin?.name ? `, ${admin.name}` : ""}. Here's what's happening
//             with your portfolio.
//           </p>
//         </div>

//         <a
//           href="/admin/projects"
//           className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-mono font-semibold text-bg shadow-[0_0_20px_-6px_var(--color-accent)] transition hover:-translate-y-0.5 hover:bg-accent/90"
//         >
//           + Add Project
//         </a>
//       </div>

//       <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
//         <StatCard
//           title="Total Projects"
//           value="6"
//           description="Portfolio projects"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="M4 7h6l2 2h8v10H4z" />
//               <path d="M4 7V5h6l2 2" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Published"
//           value="6"
//           description="Currently visible"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="m5 12 4 4L19 6" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Messages"
//           value="0"
//           description="Contact submissions"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <rect x="3" y="5" width="18" height="14" rx="2" />
//               <path d="m3 7 9 6 9-6" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Status"
//           value="Online"
//           description="Admin system"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <circle cx="12" cy="12" r="9" />
//               <path d="m8 12 3 3 5-6" />
//             </svg>
//           }
//         />
//       </div>

//       <div className="mt-6 grid gap-6 lg:grid-cols-3">
//         <div className="rounded-3xl border border-border bg-surface p-6 lg:col-span-2">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="font-display text-lg font-semibold text-text-primary">
//                 Recent Activity
//               </h2>

//               <p className="mt-1 font-mono text-xs text-text-muted">
//                 Latest portfolio activity
//               </p>
//             </div>
//           </div>

//           <div className="mt-6">
//             <ActivityRow
//               title="Portfolio system ready"
//               description="Admin dashboard connected"
//               tone="accent"
//               icon={
//                 <svg
//                   className="h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M12 5v14M5 12h14" />
//                 </svg>
//               }
//             />

//             <ActivityRow
//               title="Authentication active"
//               description="PHP session authentication is working"
//               tone="emerald"
//               isLast
//               icon={
//                 <svg
//                   className="h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.5"
//                 >
//                   <path d="M20 6L9 17l-5-5" />
//                 </svg>
//               }
//             />
//           </div>
//         </div>

//         <div className="rounded-3xl border border-border bg-surface p-6">
//           <h2 className="font-display text-lg font-semibold text-text-primary">
//             Quick Actions
//           </h2>

//           <div className="mt-5 space-y-3">
//             <QuickAction
//               href="/admin/projects"
//               label="Manage Projects"
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M4 7h6l2 2h8v10H4z" />
//                   <path d="M4 7V5h6l2 2" />
//                 </svg>
//               }
//             />

//             <QuickAction
//               href="/admin/contacts"
//               label="View Messages"
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <rect x="3" y="5" width="18" height="14" rx="2" />
//                   <path d="m3 7 9 6 9-6" />
//                 </svg>
//               }
//             />

//             <QuickAction
//               href="/"
//               label="View Portfolio"
//               external
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <circle cx="12" cy="12" r="9" />
//                   <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
//                 </svg>
//               }
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import { useEffect, useState } from "react";
// import { getCurrentAdmin } from "../../lib/auth/authService";

// const StatCard = ({ title, value, description, icon, accentBg }) => {
//   return (
//     <div
//       className={`group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${
//         accentBg
//           ? "bg-accent shadow-[0_0_30px_-8px_var(--color-accent)]"
//           : "border border-border bg-surface hover:border-accent/30"
//       }`}
//     >
//       <div className="flex items-start justify-between">
//         <p
//           className={`font-mono text-xs tracking-widest ${
//             accentBg ? "text-bg/70" : "text-text-muted"
//           }`}
//         >
//           {title.toUpperCase()}
//         </p>

//         <span
//           className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
//             accentBg ? "bg-bg/10 text-bg" : "bg-bg text-accent"
//           }`}
//         >
//           {icon}
//         </span>
//       </div>

//       <p
//         className={`mt-5 font-display text-4xl tracking-tight ${
//           accentBg ? "text-bg" : "text-text-primary"
//         }`}
//       >
//         {value}
//       </p>

//       <p
//         className={`mt-2 text-xs ${
//           accentBg ? "text-bg/60" : "text-text-muted/70"
//         }`}
//       >
//         {description}
//       </p>
//     </div>
//   );
// };

// const QuickAction = ({ href, label, icon, external = false }) => (
//   <a
//     href={href}
//     target={external ? "_blank" : undefined}
//     rel={external ? "noreferrer" : undefined}
//     className="group flex items-center justify-between rounded-2xl border border-border bg-bg/50 px-4 py-4 text-sm text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-text-primary"
//   >
//     <span className="flex items-center gap-3">
//       <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-text-muted transition-colors group-hover:text-accent">
//         {icon}
//       </span>
//       {label}
//     </span>

//     <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
//       {external ? "↗" : "→"}
//     </span>
//   </a>
// );

// const ActivityRow = ({
//   title,
//   description,
//   icon,
//   tone = "accent",
//   isLast = false,
// }) => {
//   const toneStyles = {
//     accent: "bg-accent/15 text-accent",
//     emerald: "bg-emerald-500/15 text-emerald-400",
//   };

//   return (
//     <div
//       className={`flex items-center gap-4 py-4 ${
//         !isLast ? "border-b border-border" : ""
//       }`}
//     >
//       <div
//         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
//           toneStyles[tone] || toneStyles.accent
//         }`}
//       >
//         {icon}
//       </div>

//       <div>
//         <p className="text-sm font-medium text-text-primary">{title}</p>
//         <p className="mt-1 text-xs text-text-muted/70">{description}</p>
//       </div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [admin, setAdmin] = useState(null);

//   const [stats, setStats] = useState({
//     total: 0,
//     published: 0,
//     messages: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;

//     const loadDashboardData = async () => {
//       try {
//         const [adminData, projectsResponse] = await Promise.all([
//           getCurrentAdmin(),
//           fetch("/api/projects"),
//         ]);

//         if (!projectsResponse.ok) {
//           throw new Error(
//             `Failed to fetch projects: ${projectsResponse.status}`
//           );
//         }

//         const projects = await projectsResponse.json();

//         if (!Array.isArray(projects)) {
//           throw new Error("Projects API did not return an array");
//         }

//         if (!mounted) return;

//         setAdmin(adminData);

//         setStats({
//           total: projects.length,
//           published: projects.filter(
//             (project) => project.status === "published"
//           ).length,
//           messages: 0,
//         });
//       } catch (error) {
//         console.error("Failed to load dashboard data:", error);
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadDashboardData();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return (
//     <div className="mx-auto max-w-7xl">
//       {/* Header */}
//       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <p className="mb-1 flex items-center gap-2 font-mono text-sm font-medium text-accent">
//             <span className="h-1.5 w-1.5 rounded-full bg-accent" />
//             Overview
//           </p>

//           <h1 className="font-display text-3xl font-bold text-text-primary">
//             Dashboard
//           </h1>

//           <p className="mt-2 font-mono text-sm text-text-muted">
//             Welcome back
//             {admin?.name ? `, ${admin.name}` : ""}. Here's what's happening
//             with your portfolio.
//           </p>
//         </div>

//         <a
//           href="/admin/projects"
//           className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-mono font-semibold text-bg shadow-[0_0_20px_-6px_var(--color-accent)] transition hover:-translate-y-0.5 hover:bg-accent/90"
//         >
//           + Add Project
//         </a>
//       </div>

//       {/* Stats */}
//       <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
//         <StatCard
//           title="Total Projects"
//           value={loading ? "…" : stats.total}
//           description="Portfolio projects"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="M4 7h6l2 2h8v10H4z" />
//               <path d="M4 7V5h6l2 2" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Published"
//           value={loading ? "…" : stats.published}
//           description="Currently visible"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="m5 12 4 4L19 6" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Messages"
//           value={loading ? "…" : stats.messages}
//           description="Contact submissions"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <rect x="3" y="5" width="18" height="14" rx="2" />
//               <path d="m3 7 9 6 9-6" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Status"
//           value="Online"
//           description="Admin system"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <circle cx="12" cy="12" r="9" />
//               <path d="m8 12 3 3 5-6" />
//             </svg>
//           }
//         />
//       </div>

//       {/* Content */}
//       <div className="mt-6 grid gap-6 lg:grid-cols-3">
//         {/* Recent Activity */}
//         <div className="rounded-3xl border border-border bg-surface p-6 lg:col-span-2">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="font-display text-lg font-semibold text-text-primary">
//                 Recent Activity
//               </h2>

//               <p className="mt-1 font-mono text-xs text-text-muted">
//                 Latest portfolio activity
//               </p>
//             </div>
//           </div>

//           <div className="mt-6">
//             <ActivityRow
//               title="Portfolio system ready"
//               description="Admin dashboard connected"
//               tone="accent"
//               icon={
//                 <svg
//                   className="h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M12 5v14M5 12h14" />
//                 </svg>
//               }
//             />

//             <ActivityRow
//               title="Authentication active"
//               description="PHP session authentication is working"
//               tone="emerald"
//               isLast
//               icon={
//                 <svg
//                   className="h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.5"
//                 >
//                   <path d="M20 6L9 17l-5-5" />
//                 </svg>
//               }
//             />
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="rounded-3xl border border-border bg-surface p-6">
//           <h2 className="font-display text-lg font-semibold text-text-primary">
//             Quick Actions
//           </h2>

//           <div className="mt-5 space-y-3">
//             <QuickAction
//               href="/admin/projects"
//               label="Manage Projects"
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M4 7h6l2 2h8v10H4z" />
//                   <path d="M4 7V5h6l2 2" />
//                 </svg>
//               }
//             />

//             <QuickAction
//               href="/admin/contacts"
//               label="View Messages"
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <rect x="3" y="5" width="18" height="14" rx="2" />
//                   <path d="m3 7 9 6 9-6" />
//                 </svg>
//               }
//             />

//             <QuickAction
//               href="/"
//               label="View Portfolio"
//               external
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <circle cx="12" cy="12" r="9" />
//                   <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
//                 </svg>
//               }
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import { useEffect, useState } from "react";
// import { getCurrentAdmin } from "../../lib/auth/authService";
// import { getProjects } from "../../lib/projects/projectService";

// const StatCard = ({ title, value, description, icon, accentBg = false }) => {
//   return (
//     <div
//       className={`group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${
//         accentBg
//           ? "bg-accent shadow-[0_0_30px_-8px_var(--color-accent)]"
//           : "border border-border bg-surface hover:border-accent/30"
//       }`}
//     >
//       <div className="flex items-start justify-between">
//         <p
//           className={`font-mono text-xs tracking-widest ${
//             accentBg ? "text-bg/70" : "text-text-muted"
//           }`}
//         >
//           {title.toUpperCase()}
//         </p>

//         <span
//           className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
//             accentBg ? "bg-bg/10 text-bg" : "bg-bg text-accent"
//           }`}
//         >
//           {icon}
//         </span>
//       </div>

//       <p
//         className={`mt-5 font-display text-4xl tracking-tight ${
//           accentBg ? "text-bg" : "text-text-primary"
//         }`}
//       >
//         {value}
//       </p>

//       <p
//         className={`mt-2 text-xs ${
//           accentBg ? "text-bg/60" : "text-text-muted/70"
//         }`}
//       >
//         {description}
//       </p>
//     </div>
//   );
// };

// const QuickAction = ({
//   href,
//   label,
//   icon,
//   external = false,
// }) => {
//   return (
//     <a
//       href={href}
//       target={external ? "_blank" : undefined}
//       rel={external ? "noreferrer" : undefined}
//       className="group flex items-center justify-between rounded-2xl border border-border bg-bg/50 px-4 py-4 text-sm text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-text-primary"
//     >
//       <span className="flex items-center gap-3">
//         <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-text-muted transition-colors group-hover:text-accent">
//           {icon}
//         </span>

//         {label}
//       </span>

//       <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
//         {external ? "↗" : "→"}
//       </span>
//     </a>
//   );
// };

// const ActivityRow = ({
//   title,
//   description,
//   icon,
//   tone = "accent",
//   isLast = false,
// }) => {
//   const toneStyles = {
//     accent: "bg-accent/15 text-accent",
//     emerald: "bg-emerald-500/15 text-emerald-400",
//   };

//   return (
//     <div
//       className={`flex items-center gap-4 py-4 ${
//         !isLast ? "border-b border-border" : ""
//       }`}
//     >
//       <div
//         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
//           toneStyles[tone] || toneStyles.accent
//         }`}
//       >
//         {icon}
//       </div>

//       <div>
//         <p className="text-sm font-medium text-text-primary">
//           {title}
//         </p>

//         <p className="mt-1 text-xs text-text-muted/70">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [admin, setAdmin] = useState(null);

//   const [stats, setStats] = useState({
//     total: 0,
//     published: 0,
//     messages: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let mounted = true;

//     const loadDashboardData = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         // Load admin information
//         const adminData = await getCurrentAdmin();

//         if (!mounted) return;

//         setAdmin(adminData);

//         // Load projects
//         const result = await getProjects();

//         if (!mounted) return;

//         // Support both:
//         // 1. getProjects() -> [...]
//         // 2. getProjects() -> { data: [...] }
//         const projects = Array.isArray(result)
//           ? result
//           : Array.isArray(result?.data)
//             ? result.data
//             : [];

//         setStats({
//           total: projects.length,

//           published: projects.filter(
//             (project) => project.status === "published"
//           ).length,

//           // Connect this to your contacts service later
//           messages: 0,
//         });
//       } catch (err) {
//         console.error(
//           "Failed to load dashboard data:",
//           err
//         );

//         if (mounted) {
//           setError(
//             "Unable to load dashboard data. Check the console for details."
//           );
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     loadDashboardData();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return (
//     <div className="mx-auto max-w-7xl">
//       {/* Header */}
//       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <p className="mb-1 flex items-center gap-2 font-mono text-sm font-medium text-accent">
//             <span className="h-1.5 w-1.5 rounded-full bg-accent" />
//             Overview
//           </p>

//           <h1 className="font-display text-3xl font-bold text-text-primary">
//             Dashboard
//           </h1>

//           <p className="mt-2 font-mono text-sm text-text-muted">
//             Welcome back
//             {admin?.name ? `, ${admin.name}` : ""}. Here's what's happening
//             with your portfolio.
//           </p>
//         </div>

//         <a
//           href="/admin/projects"
//           className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-mono font-semibold text-bg shadow-[0_0_20px_-6px_var(--color-accent)] transition hover:-translate-y-0.5 hover:bg-accent/90"
//         >
//           + Add Project
//         </a>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
//           {error}
//         </div>
//       )}

//       {/* Statistics */}
//       <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
//         <StatCard
//           title="Total Projects"
//           value={loading ? "…" : stats.total}
//           description="Portfolio projects"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="M4 7h6l2 2h8v10H4z" />
//               <path d="M4 7V5h6l2 2" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Published"
//           value={loading ? "…" : stats.published}
//           description="Currently visible"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="m5 12 4 4L19 6" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Messages"
//           value={loading ? "…" : stats.messages}
//           description="Contact submissions"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <rect
//                 x="3"
//                 y="5"
//                 width="18"
//                 height="14"
//                 rx="2"
//               />
//               <path d="m3 7 9 6 9-6" />
//             </svg>
//           }
//         />

//         <StatCard
//           title="Status"
//           value="Online"
//           description="Admin system"
//           icon={
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <circle
//                 cx="12"
//                 cy="12"
//                 r="9"
//               />
//               <path d="m8 12 3 3 5-6" />
//             </svg>
//           }
//         />
//       </div>

//       {/* Main Content */}
//       <div className="mt-6 grid gap-6 lg:grid-cols-3">
//         {/* Recent Activity */}
//         <div className="rounded-3xl border border-border bg-surface p-6 lg:col-span-2">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="font-display text-lg font-semibold text-text-primary">
//                 Recent Activity
//               </h2>

//               <p className="mt-1 font-mono text-xs text-text-muted">
//                 Latest portfolio activity
//               </p>
//             </div>
//           </div>

//           <div className="mt-6">
//             <ActivityRow
//               title="Portfolio system ready"
//               description="Admin dashboard connected"
//               tone="accent"
//               icon={
//                 <svg
//                   className="h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M12 5v14M5 12h14" />
//                 </svg>
//               }
//             />

//             <ActivityRow
//               title="Authentication active"
//               description="PHP session authentication is working"
//               tone="emerald"
//               isLast
//               icon={
//                 <svg
//                   className="h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.5"
//                 >
//                   <path d="M20 6L9 17l-5-5" />
//                 </svg>
//               }
//             />
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="rounded-3xl border border-border bg-surface p-6">
//           <h2 className="font-display text-lg font-semibold text-text-primary">
//             Quick Actions
//           </h2>

//           <div className="mt-5 space-y-3">
//             <QuickAction
//               href="/admin/projects"
//               label="Manage Projects"
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path d="M4 7h6l2 2h8v10H4z" />
//                   <path d="M4 7V5h6l2 2" />
//                 </svg>
//               }
//             />

//             <QuickAction
//               href="/admin/contacts"
//               label="View Messages"
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <rect
//                     x="3"
//                     y="5"
//                     width="18"
//                     height="14"
//                     rx="2"
//                   />
//                   <path d="m3 7 9 6 9-6" />
//                 </svg>
//               }
//             />

//             <QuickAction
//               href="/"
//               label="View Portfolio"
//               external
//               icon={
//                 <svg
//                   className="h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <circle
//                     cx="12"
//                     cy="12"
//                     r="9"
//                   />
//                   <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
//                 </svg>
//               }
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import { useEffect, useState } from "react";
import { getCurrentAdmin } from "../../lib/auth/authService";
import { getProjects } from "../../lib/projects/projectService";
import { getContacts } from "../../lib/contacts/contactService";

const StatCard = ({
  title,
  value,
  description,
  icon,
  accentBg = false,
}) => {
  return (
    <div
      className={`group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${
        accentBg
          ? "bg-accent shadow-[0_0_30px_-8px_var(--color-accent)]"
          : "border border-border bg-surface hover:border-accent/30"
      }`}
    >
      <div className="flex items-start justify-between">
        <p
          className={`font-mono text-xs tracking-widest ${
            accentBg ? "text-bg/70" : "text-text-muted"
          }`}
        >
          {title.toUpperCase()}
        </p>

        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
            accentBg
              ? "bg-bg/10 text-bg"
              : "bg-bg text-accent"
          }`}
        >
          {icon}
        </span>
      </div>

      <p
        className={`mt-5 font-display text-4xl tracking-tight ${
          accentBg
            ? "text-bg"
            : "text-text-primary"
        }`}
      >
        {value}
      </p>

      <p
        className={`mt-2 text-xs ${
          accentBg
            ? "text-bg/60"
            : "text-text-muted/70"
        }`}
      >
        {description}
      </p>
    </div>
  );
};

const QuickAction = ({
  href,
  label,
  icon,
  external = false,
}) => {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center justify-between rounded-2xl border border-border bg-bg/50 px-4 py-4 text-sm text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-text-primary"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-text-muted transition-colors group-hover:text-accent">
          {icon}
        </span>

        {label}
      </span>

      <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
        {external ? "↗" : "→"}
      </span>
    </a>
  );
};

const ActivityRow = ({
  title,
  description,
  icon,
  tone = "accent",
  isLast = false,
}) => {
  const toneStyles = {
    accent: "bg-accent/15 text-accent",
    emerald: "bg-emerald-500/15 text-emerald-400",
  };

  return (
    <div
      className={`flex items-center gap-4 py-4 ${
        !isLast
          ? "border-b border-border"
          : ""
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          toneStyles[tone] ||
          toneStyles.accent
        }`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-text-primary">
          {title}
        </p>

        <p className="mt-1 text-xs text-text-muted/70">
          {description}
        </p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [admin, setAdmin] = useState(null);

  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        /*
         * Load admin information
         */
        const adminData = await getCurrentAdmin();

        if (!mounted) return;

        setAdmin(adminData);

        /*
         * Load projects and contacts simultaneously
         */
        const [projectsResult, contactsResult] =
          await Promise.all([
            getProjects(),
            getContacts(),
          ]);

        if (!mounted) return;

        /*
         * Support both:
         *
         * getProjects() -> [...]
         *
         * OR
         *
         * getProjects() -> { data: [...] }
         */
        const projects = Array.isArray(projectsResult)
          ? projectsResult
          : Array.isArray(projectsResult?.data)
            ? projectsResult.data
            : [];

        /*
         * Support both:
         *
         * getContacts() -> [...]
         *
         * OR
         *
         * getContacts() -> { data: [...] }
         */
        const contacts = Array.isArray(contactsResult)
          ? contactsResult
          : Array.isArray(contactsResult?.data)
            ? contactsResult.data
            : [];

        /*
         * Update dashboard statistics
         */
        setStats({
          total: projects.length,

          published: projects.filter(
            (project) =>
              project?.status === "published"
          ).length,

          messages: contacts.length,
        });
      } catch (err) {
        console.error(
          "Failed to load dashboard data:",
          err
        );

        if (mounted) {
          setError(
            "Unable to load dashboard data. Check the console for details."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 flex items-center gap-2 font-mono text-sm font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Overview
          </p>

          <h1 className="font-display text-3xl font-bold text-text-primary">
            Dashboard
          </h1>

          <p className="mt-2 font-mono text-sm text-text-muted">
            Welcome back
            {admin?.name
              ? `, ${admin.name}`
              : ""}
            . Here's what's happening with your
            portfolio.
          </p>
        </div>

        {/* Add Project */}
        <a
          href="/admin/projects"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-mono font-semibold text-bg shadow-[0_0_20px_-6px_var(--color-accent)] transition hover:-translate-y-0.5 hover:bg-accent/90"
        >
          + Add Project
        </a>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Projects */}
        <StatCard
          title="Total Projects"
          value={
            loading
              ? "…"
              : stats.total
          }
          description="Portfolio projects"
          icon={
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h6l2 2h8v10H4z" />
              <path d="M4 7V5h6l2 2" />
            </svg>
          }
        />

        {/* Published */}
        <StatCard
          title="Published"
          value={
            loading
              ? "…"
              : stats.published
          }
          description="Currently visible"
          icon={
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          }
        />

        {/* Messages */}
        <StatCard
          title="Messages"
          value={
            loading
              ? "…"
              : stats.messages
          }
          description="Contact submissions"
          icon={
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
              />
              <path d="m3 7 9 6 9-6" />
            </svg>
          }
        />

        {/* Status */}
        <StatCard
          title="Status"
          value="Online"
          description="Admin system"
          icon={
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />
              <path d="m8 12 3 3 5-6" />
            </svg>
          }
        />
      </div>

      {/* Main Content */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-3xl border border-border bg-surface p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Recent Activity
              </h2>

              <p className="mt-1 font-mono text-xs text-text-muted">
                Latest portfolio activity
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ActivityRow
              title="Portfolio system ready"
              description="Admin dashboard connected"
              tone="accent"
              icon={
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              }
            />

            <ActivityRow
              title="Authentication active"
              description="PHP session authentication is working"
              tone="emerald"
              isLast
              icon={
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-3xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Quick Actions
          </h2>

          <div className="mt-5 space-y-3">
            {/* Manage Projects */}
            <QuickAction
              href="/admin/projects"
              label="Manage Projects"
              icon={
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 7h6l2 2h8v10H4z" />
                  <path d="M4 7V5h6l2 2" />
                </svg>
              }
            />

            {/* View Messages */}
            <QuickAction
              href="/admin/contacts"
              label="View Messages"
              icon={
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              }
            />

            {/* View Portfolio */}
            <QuickAction
              href="/"
              label="View Portfolio"
              external
              icon={
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />
                  <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;