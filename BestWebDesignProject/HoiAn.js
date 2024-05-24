// Hàm tạo hiệu ứng số tăng dần
function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
    const startTime = performance.now();
    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime > duration) {
            callback(finalNumber);
        } else {
            const rate = elapsedTime / duration;
            const currentNumber = Math.round(rate * finalNumber);
            callback(currentNumber);
            requestAnimationFrame(updateNumber);
        }
    }
    requestAnimationFrame(updateNumber);
}

// Sử dụng Intersection Observer API để bắt đầu hiệu ứng khi cuộn tới phần tử
document.addEventListener('DOMContentLoaded', () => {
    const animatedNumbers = document.querySelectorAll('.animated-number');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const finalNumber = parseInt(entry.target.getAttribute('data-final-number'), 10);
                animateNumber(finalNumber, 3000, 0, function (number) {
                    entry.target.textContent = number.toLocaleString();
                });
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    animatedNumbers.forEach(number => {
        observer.observe(number);
    });
});

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
