//обычный объект
export default {
    mounted(el, binding) {

        const options = {
          rootMargin: "0px",
          threshold: 1.0,
        };
        const callback = (entries, observer) => {
          /* Content excerpted, show below */
          if (entries[0].isIntersecting) {
            binding.value()
          }
        };
        const observer = new IntersectionObserver(callback, options);

        //следить за следующими элементами
        observer.observe(el)
    },
    name: 'intersection'
}