// import { useState } from "react";
// import Navbar from "../../components/layout/navbar/Navbar";
// import Footer from "../../components/layout/footer/Footer";
// import Container from "../../components/ui/layout-primitives/Container";
// import ContactInfoRow from "../../components/features/contact/ContactInfoRow";
// import FormField from "../../components/ui/forms/FormField";
// import { submitContactForm } from '../../lib/api/contactService'

// import {
//   GithubIcon,
//   LinkedinIcon,
//   XIcon,
// } from "../../components/ui/icons/SocialIcons";
// import {
//   CONTACT_DETAILS,
//   AVAILABILITY_TEXT,
// } from "../../constants/contact/contactInfo";
// import { SOCIAL_LINKS } from "../../constants/footer/footer";

// const ICONS = { github: GithubIcon, linkedin: LinkedinIcon, x: XIcon };

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [status, setStatus] = useState("idle"); // idle | submitting | sent

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setStatus("submitting");

//     // Replace with your actual submit logic (API call, EmailJS, Formspree, etc.)
//     setTimeout(() => {
//       setStatus("sent");
//       setFormData({ name: "", email: "", message: "" });
//     }, 1000);
//   };

//   return (
//     <>
//       <Navbar />

//       {/* <section className="py-24"> */}
//       <section className="py-16 md:px-8 md:py-20 lg:px-12">

//         <Container>
//           {/* Eyebrow + heading */}
//           <div className="mb-6 flex items-center gap-3">
//             <span className="h-px w-8 bg-accent" />
//             <span className="font-mono text-sm tracking-widest text-accent">
//               {/* 04 — CONTACT */}
//               CONTACT
//             </span>
//           </div>

//           <h1 className="font-display text-6xl leading-[0.85] tracking-tight md:text-7xl">
//             LET'S <span className="text-outline">TALK</span>
//           </h1>

//           <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
//             {/* Left column */}
//             <div>
//               <p className="max-w-md text-lg text-text-muted">
//                 Got an interesting idea? {" "}
//                 <span className="font-semibold text-text-primary">
//                   Let’s build something great.
//                 </span>
//                 {" "}
//                 {/* <span className="font-semibold text-text-primary">
                  
//                 </span> */}

//               </p>

//               <div className="mt-12">
//                 <ContactInfoRow
//                   label="Email"
//                   value={CONTACT_DETAILS.email}
//                   href={`mailto:${CONTACT_DETAILS.email}`}
//                 />
//                 <ContactInfoRow
//                   label="Phone"
//                   value={CONTACT_DETAILS.phone}
//                   href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, "")}`}
//                 />
//                 <ContactInfoRow
//                   label="Location"
//                   value={CONTACT_DETAILS.location}
//                   href="#"
//                 />
//               </div>

//               <p className="mt-12 font-mono text-xs tracking-widest text-text-muted">
//                 FIND ME ONLINE
//               </p>

//               <div className="mt-4 flex items-center gap-3">
//                 {SOCIAL_LINKS.filter((s) => ICONS[s.icon]).map((social) => {
//                   const Icon = ICONS[social.icon];

//                   return (
//                     <a
//                       key={social.label}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex h-16 w-16 flex-col items-center justify-center gap-1 border border-border text-text-muted transition-colors hover:border-accent/50 hover:text-text-primary"
//                     >
//                       <Icon size={18} />
//                       <span className="font-mono text-[10px] tracking-wide">
//                         {social.label.toUpperCase()}
//                       </span>
//                     </a>
//                   );
//                 })}
//               </div>

//               <div className="mt-8 inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-5 py-3 font-mono text-xs tracking-widest text-accent">
//                 <span className="h-1.5 w-1.5 rounded-full bg-accent" />
//                 {AVAILABILITY_TEXT}
//               </div>
//             </div>

//             {/* Right column: form */}
//             <form onSubmit={handleSubmit} className="flex flex-col gap-8">
//               <FormField
//                 label="Name"
//                 name="name"
//                 placeholder="Your name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />

//               <FormField
//                 label="Email"
//                 name="email"
//                 type="email"
//                 placeholder="your@email.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />

//               <FormField
//                 label="Message"
//                 as="textarea"
//                 name="message"
//                 rows={6}
//                 placeholder="Tell me about your project..."
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//               />

//               <button
//                 type="submit"
//                 disabled={status === "submitting"}
//                 className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-6 py-4 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-60"
//               >
//                 {status === "submitting"
//                   ? "Sending..."
//                   : status === "sent"
//                     ? "Sent!"
//                     : "Send Message"}
//                 <span aria-hidden="true">→</span>
//               </button>
//             </form>
//           </div>
//         </Container>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default Contact;

import { useState } from "react";
import Navbar from "../../components/layout/navbar/Navbar";
import Footer from "../../components/layout/footer/Footer";
import Container from "../../components/ui/layout-primitives/Container";
import ContactInfoRow from "../../components/features/contact/ContactInfoRow";
import FormField from "../../components/ui/forms/FormField";
import { submitContactForm } from "../../lib/api/contactService";

import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
} from "../../components/ui/icons/SocialIcons";

import {
  CONTACT_DETAILS,
  AVAILABILITY_TEXT,
} from "../../constants/contact/contactInfo";

import { SOCIAL_LINKS } from "../../constants/footer/footer";

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await submitContactForm(formData);
      setStatus("sent");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />

      <section className="py-16 md:px-8 md:py-20 lg:px-12">
        <Container>
          {/* Eyebrow + heading */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />

            <span className="font-mono text-sm tracking-widest text-accent">
              {/* 04 — CONTACT */}
              CONTACT
            </span>
          </div>

          <h1 className="font-display text-6xl leading-[0.85] tracking-tight md:text-7xl">
            LET'S <span className="text-outline">TALK</span>
          </h1>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left column */}
            <div>
              <p className="max-w-md text-lg text-text-muted">
                Got an interesting idea?{" "}
                <span className="font-semibold text-text-primary">
                  Let's build something great.
                </span>
              </p>

              <div className="mt-12">
                <ContactInfoRow
                  label="Email"
                  value={CONTACT_DETAILS.email}
                  href={`mailto:${CONTACT_DETAILS.email}`}
                />

                <ContactInfoRow
                  label="Phone"
                  value={CONTACT_DETAILS.phone}
                  href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, "")}`}
                />

                <ContactInfoRow
                  label="Location"
                  value={CONTACT_DETAILS.location}
                  href="#"
                />
              </div>

              <p className="mt-12 font-mono text-xs tracking-widest text-text-muted">
                FIND ME ONLINE
              </p>

              <div className="mt-4 flex items-center gap-3">
                {SOCIAL_LINKS.filter((s) => ICONS[s.icon]).map((social) => {
                  const Icon = ICONS[social.icon];

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-16 w-16 flex-col items-center justify-center gap-1 border border-border text-text-muted transition-colors hover:border-accent/50 hover:text-text-primary"
                    >
                      <Icon size={18} />

                      <span className="font-mono text-[10px] tracking-wide">
                        {social.label.toUpperCase()}
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-5 py-3 font-mono text-xs tracking-widest text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {AVAILABILITY_TEXT}
              </div>
            </div>

            {/* Right column: form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <FormField
                label="Name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <FormField
                label="Message"
                as="textarea"
                name="message"
                rows={6}
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-6 py-4 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "submitting"
                  ? "Sending..."
                  : status === "sent"
                    ? "Sent!"
                    : status === "error"
                      ? "Failed — Try Again"
                      : "Send Message"}

                <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Contact;