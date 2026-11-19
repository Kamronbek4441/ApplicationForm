import { useState } from "react";
import "./applicationForm.css";

// telegram bot
const BOT_TOKEN = "9051900898:AAF_UNS3tzugIDFpF4eClcBHU9VAMcxg3W0";
const CHAT_ID = "8286913203";

function ApplicationForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    country: "",
    education: "",
    university: "",
    experience: "",
    skills: "",
    about: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const message = `
📩 NEW APPLICATION

━━━━━━━━━━━━━━━━━━

👤 PERSONAL INFORMATION

First Name: ${form.firstName}
Last Name: ${form.lastName}
Email: ${form.email}
Phone: ${form.phone}
Birth Date: ${form.birthDate}
Gender: ${form.gender}
Country: ${form.country}

━━━━━━━━━━━━━━━━━━

🎓 EDUCATION

Education: ${form.education}
University: ${form.university}

━━━━━━━━━━━━━━━━━━

💼 EXPERIENCE

Experience: ${form.experience || "Not specified"}
Skills: ${form.skills || "Not specified"}

━━━━━━━━━━━━━━━━━━

📝 ABOUT

${form.about || "Not specified"}

━━━━━━━━━━━━━━━━━━
`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        },
      );

      const result = await response.json();

      if (!result.ok) {
        throw new Error(result.description || "Telegram error");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Telegram error:", err);
      setError("Ariza yuborilmadi. Qayta urinib ko'ring!");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
      gender: "",
      country: "",
      education: "",
      university: "",
      experience: "",
      skills: "",
      about: "",
    });

    setSubmitted(false);
    setError("");
  };

  return (
    <div className="app-container">
      <div className="form-wrapper">
        <div className="form-header">
          <div className="logo">A</div>
          <span className="form-label">APPLICATION PORTAL</span>

          <h1>Application Form</h1>

          <p>
            Please complete the form below to submit your application. All
            fields marked with * are required.
          </p>
        </div>

        {submitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>

            <h2>Application Submitted!</h2>

            <p>
              Thank you for applying. Your application has been successfully
              sent.
            </p>

            <button onClick={resetForm}>Submit Another Application</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="section-title">
              <span>01</span>
              <div>
                <h2>Personal Information</h2>
                <p>Tell us about yourself</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+998 90 123 45 67"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  name="birthDate"
                  value={form.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Gender *</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Country *</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter your country"
                  value={form.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="section-title">
              <span>02</span>
              <div>
                <h2>Education Background</h2>
                <p>Your academic information</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Education Level *</label>
                <select
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select education</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor">Bachelor's Degree</option>
                  <option value="Master">Master's Degree</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div className="form-group">
                <label>School / University *</label>
                <input
                  type="text"
                  name="university"
                  placeholder="Enter institution name"
                  value={form.university}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="section-title">
              <span>03</span>
              <div>
                <h2>Experience & Skills</h2>
                <p>Share your professional background</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Work Experience</label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                >
                  <option value="">Select experience</option>
                  <option value="No experience">No experience</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Skills</label>
                <input
                  type="text"
                  name="skills"
                  placeholder="e.g. React, JavaScript, UI Design"
                  value={form.skills}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>About Yourself</label>
                <textarea
                  name="about"
                  placeholder="Tell us a little about yourself..."
                  rows={5}
                  value={form.about}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <div className="form-error">⚠️ {error}</div>}

            <div className="form-footer">
              <p>
                By submitting this form, you confirm that the information
                provided is accurate.
              </p>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Submit Application"}
                {!loading && <span> →</span>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ApplicationForm;
