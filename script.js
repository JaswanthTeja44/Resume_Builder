  const form = document.getElementById('resumeForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const summary = document.getElementById('summary');
  const skills = document.getElementById('skills');
  const experience = document.getElementById('experience');
  const education = document.getElementById('education');
  const projects = document.getElementById('projects');

  const previewName = document.getElementById('previewName');
  const previewEmail = document.getElementById('previewEmail');
  const previewPhone = document.getElementById('previewPhone');
  const previewSummary = document.getElementById('previewSummary');
  const previewSkills = document.getElementById('previewSkills');
  const previewExperience = document.getElementById('previewExperience');
  const previewEducation = document.getElementById('previewEducation');
  const previewProjects = document.getElementById('previewProjects');

  const errors = {
    fullName: document.getElementById('fullNameError'),
    email: document.getElementById('emailError'),
    phone: document.getElementById('phoneError'),
    summary: document.getElementById('summaryError'),
    skills: document.getElementById('skillsError')
  };

  function validateField(field, errorKey, regex = null) {
    if (!field.value.trim()) {
      errors[errorKey].textContent = `${field.previousElementSibling.textContent} is required.`;
      return false;
    } else if (regex && !regex.test(field.value.trim())) {
      errors[errorKey].textContent = `Please enter a valid ${field.name}.`;
      return false;
    }
    errors[errorKey].textContent = '';
    return true;
  }

  function updatePreview() {
    previewName.textContent = fullName.value.trim() || 'Your Name';
    previewEmail.textContent = email.value.trim() || 'email@example.com';
    previewPhone.textContent = phone.value.trim() || '+1 234 567 8901';
    previewSummary.textContent = summary.value.trim() || 'Your professional summary will appear here...';
    const skillList = skills.value.split(',').map(s => s.trim()).filter(Boolean);
    previewSkills.innerHTML = skillList.length ? skillList.map(s => `<li>${s}</li>`).join('') : '<li>Example Skill</li>';
    previewExperience.textContent = experience.value.trim() || 'No experience added yet.';
    previewEducation.textContent = education.value.trim() || 'No education added yet.';
    previewProjects.textContent = projects.value.trim() || 'No projects added yet.';
  }

  form.addEventListener('input', updatePreview);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const valid = [
      validateField(fullName, 'fullName'),
      validateField(email, 'email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      validateField(phone, 'phone', /^\+?\d{7,15}$/),
      validateField(summary, 'summary'),
      validateField(skills, 'skills')
    ];
    if (valid.every(Boolean)) {
      alert('Resume generated successfully! Check the preview panel.');
    } else {
      alert('Please fix errors in the form before submitting.');
    }
  });

  function downloadAsDOC() {
    const html = `
      <h1>${previewName.textContent}</h1>
      <p>Email: ${previewEmail.textContent}</p>
      <p>Phone: ${previewPhone.textContent}</p>
      <h2>Summary</h2>
      <p>${previewSummary.textContent}</p>
      <h2>Skills</h2>
      <ul>${[...previewSkills.querySelectorAll('li')].map(li => `<li>${li.textContent}</li>`).join('')}</ul>
      <h2>Experience</h2>
      <p>${previewExperience.textContent}</p>
      <h2>Education</h2>
      <p>${previewEducation.textContent}</p>
      <h2>Projects</h2>
      <p>${previewProjects.textContent}</p>
    `;
    const blob = new Blob(['<html><body>' + html + '</body></html>'], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Resume.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  updatePreview();