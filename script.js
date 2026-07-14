document.addEventListener("DOMContentLoaded", () => {
    const envelope = document.getElementById("envelope");
    const welcomeSection = document.getElementById("welcomeSection");
    const invitationSection = document.getElementById("invitationSection");
    const tapText = document.getElementById("tapText");
    const particlesContainer = document.getElementById("particlesContainer");
    const musicBtn = document.getElementById("musicBtn");
    const bgMusic = document.getElementById("bgMusic");

    // --- 1. توليد تأثير تساقط مالي كامل الشاشة من البداية فوراً ---
    function initFallingSystem() {
        const icons = ["❤", "✨", "♥", "✦", "🌸"];
        
        // إنشاء وجبة مكثفة فورية تملأ الشاشة كلها من أول ثانية
        for (let i = 0; i < 15; i++) {
            createParticle(icons, true);
        }
        
        setInterval(() => {
            createParticle(icons, false);
        }, 200); // توليد مستمر وسريع لملء الشاشة
    }

    function createParticle(icons, initialLoad) {
        const particle = document.createElement("div");
        const isHeart = Math.random() > 0.4;
        
        particle.className = isHeart ? "falling-heart" : "falling-star";
        particle.innerText = icons[Math.floor(Math.random() * icons.length)];
        
        particle.style.left = Math.random() * 100 + "vw";
        
        // إذا كان التحميل أول مرة، وزّع الجسيمات عشوائياً في الارتفاع لتجنب الشاشة الفاضية
        if (initialLoad) {
            particle.style.top = Math.random() * 100 + "vh";
        } else {
            particle.style.top = "-5vh";
        }
        
        particle.style.animationDuration = (Math.random() * 3 + 4) + "s";
        particle.style.fontSize = (Math.random() * 14 + 12) + "px";
        particle.style.opacity = Math.random() * 0.8 + 0.4;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => { particle.remove(); }, 6000);
    }
    initFallingSystem();

    // --- 2. نظام انفجار الصواريخ والألعاب النارية مالي كل حتة بالشاشة ---
    function launchFireworks(x, y) {
        const colors = ['#e63946', '#f1a7a6', '#ffb703', '#fb8500', '#219ebc', '#ffffff', '#ebdcc9', '#f15bb5'];
        const particleCount = 75; // انفجار ضخم وكثيف جداً للمفاجأة

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'firework-particle';
            p.style.left = x + 'px';
            p.style.top = y + 'px';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 240 + 60; // زيادة مدى الانطلاق لتنتشر في كامل مساحة الشاشة
            const destX = Math.cos(angle) * velocity;
            const destY = Math.sin(angle) * velocity + 60; // تأثير جاذبية سينمائي لسقوط الشظايا

            p.style.setProperty('--x', `${destX}px`);
            p.style.setProperty('--y', `${destY}px`);
            p.style.setProperty('--shadow', `0 0 10px ${p.style.background}`);
            
            document.body.appendChild(p);
            setTimeout(() => { p.remove(); }, 1200);
        }
    }

    // إدارة الموسيقى الخلفية
    musicBtn.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.innerText = "⏸";
        } else {
            bgMusic.pause();
            musicBtn.innerText = "🎵";
        }
    });

    // --- 3. حركة الضغط والانطلاق السينمائي التام ---
    envelope.addEventListener("click", () => {
        if (envelope.classList.contains("open")) return;
        
        envelope.classList.add("open");
        tapText.innerText = "جاري تحضير ليلة العمر...";
        
        bgMusic.play().then(() => { musicBtn.innerText = "⏸"; }).catch(() => {});

        // الحصول على إحداثيات الضغط الحقيقية بالنسبة للشاشة الكاملة (Fixed)
        const rect = envelope.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // تفجيرات متلاحقة في كل أرجاء الشاشة لتغطية المشهد بالبهجة
        setTimeout(() => { launchFireworks(cx, cy - 80); }, 100);
        setTimeout(() => { launchFireworks(cx - 150, cy - 100); }, 300);
        setTimeout(() => { launchFireworks(cx + 150, cy - 100); }, 500);
        setTimeout(() => { launchFireworks(cx, cy - 250); }, 700);

        // انتقال رائع واختفاء الظرف وصعود كارت الفرح الأصلي
        setTimeout(() => {
            welcomeSection.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            welcomeSection.style.opacity = "0";
            welcomeSection.style.transform = "scale(0.92)";
            
            setTimeout(() => {
                welcomeSection.classList.add("hidden");
                invitationSection.classList.remove("hidden");
                
                setTimeout(() => {
                    invitationSection.classList.add("show");
                }, 50);
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 800);
        }, 1500);
    });

    // ربط الأزرار التفاعلية
    document.getElementById("locationBtn").addEventListener("click", () => {
        window.open("https://maps.google.com/?q=قاعة+جاردنيا+الوراق", "_blank");
    });

    document.getElementById("calendarBtn").addEventListener("click", () => {
        window.open("https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Amr+%26+Aya&dates=20260813T160000Z/20260813T220000Z&details=ننتظركم+بكل+حب+وفرح&location=قاعة+جاردنيا+الوراق", "_blank");
    });

    document.getElementById("downloadBtn").addEventListener("click", () => {
        const a = document.createElement('a');
        a.href = '110323.png';
        a.download = 'Wedding_Invitation_Amr_Aya.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    document.getElementById("shareBtn").addEventListener("click", () => {
        if (navigator.share) {
            navigator.share({
                title: 'دعوة زفاف عمرو وآية',
                text: 'يسعدنا أن تشاركونا فرحتنا في يوم العمر',
                url: window.location.href
            }).catch(console.error);
        } else {
            alert("انسخ رابط الصفحة وشاركه مع عائلتك وأحبابك!");
        }
    });

    // العداد التنازلي التلقائي لليلة الفرح المنتظرة 13/08/2026
    const weddingDate = new Date("August 13, 2026 18:00:00").getTime();
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference < 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "<h3>اليوم هو يوم فرحتنا الكبرى، منورين جميعاً! ✨</h3>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = `
            <span>${days}<div>أيام</div></span>
            <span>${hours}<div>ساعات</div></span>
            <span>${minutes}<div>دقائق</div></span>
            <span>${seconds}<div>ثواني</div></span>
        `;
    }, 1000);
});