export function scrollToSection(sectionId: string) {
  const id = sectionId.replace(/^#/, '');
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
