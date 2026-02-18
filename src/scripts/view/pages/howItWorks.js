class HowItWorks {
  _render() {
    const section = document.createElement('section');
    section.innerHTML = `
    <h1 class="text-center my-5 py-5">Hello World</h1> `;
    return section;
  }
}

export default HowItWorks;
