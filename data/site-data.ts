export const navigation = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Self-Assessments", href: "/assessments" },
  { label: "Workshops", href: "/workshops-training" },
  { label: "Wellness Insights", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const services = [
  {
    icon: "book",
    slug: "student-counseling",
    title: "Student Counseling",
    description: "Steady support for academic pressure, confidence and life transitions.",
    intro: "A supportive space for students to understand pressure, build confidence and navigate change without feeling alone.",
    helpsWith: ["Academic stress and exam anxiety", "Confidence and self-esteem", "Concentration and motivation", "Transitions, relationships and future choices"],
    approach: "Sessions combine careful listening with practical emotional-regulation, planning and coping tools suited to the student’s age and circumstances.",
    tint: "bg-sky/70",
    accent: "blue",
    number: "01",
    image: "/images/service-students.jpg",
    imageAlt: "University students sharing ideas together outdoors",
  },
  {
    icon: "spark",
    slug: "teen-counseling",
    title: "Teen Counseling",
    description: "A respectful space for young people to understand emotions and feel heard.",
    intro: "Confidential, age-appropriate support that helps teenagers make sense of emotions, relationships and the pressures around them.",
    helpsWith: ["Anxiety, low mood and emotional overwhelm", "Peer and family relationships", "Identity, confidence and communication", "School pressure and behavioural changes"],
    approach: "We build trust first, move at the young person’s pace and involve parents thoughtfully when it supports safety and progress.",
    tint: "bg-mint/55",
    accent: "mint",
    number: "02",
    image: "/images/service-teens-v2.png",
    imageAlt: "An Indian teenager speaking with a counsellor in a calm, welcoming room",
  },
  {
    icon: "heart",
    slug: "personal-counseling",
    title: "Personal Counseling",
    description: "One-to-one guidance through stress, grief, change and emotional challenges.",
    intro: "Individual counselling offers time and privacy to understand what is difficult, recognise patterns and develop a steadier way forward.",
    helpsWith: ["Stress, anxiety and low mood", "Grief, trauma and difficult life events", "Self-esteem and relationship patterns", "Change, uncertainty and personal growth"],
    approach: "Your goals guide the work. Evidence-informed conversation and practical exercises are adapted to your needs, values and pace.",
    tint: "bg-warm/55",
    accent: "warm",
    number: "03",
    image: "/images/service-personal-v2.png",
    imageAlt: "An Indian counsellor listening carefully during a private session",
  },
  {
    icon: "people",
    slug: "couple-family-counseling",
    title: "Couple & Family Counseling",
    description: "Compassionate conversations that strengthen trust and communication.",
    intro: "A balanced space where couples and families can slow difficult conversations down, understand one another and rebuild connection.",
    helpsWith: ["Communication and recurring conflict", "Trust, closeness and life transitions", "Parenting and family relationships", "Separation, reconciliation and shared decisions"],
    approach: "The counsellor does not take sides. Sessions clarify patterns, make room for each voice and support respectful, workable change.",
    tint: "bg-[#EEF0FA]",
    accent: "lilac",
    number: "04",
    image: "/images/service-couples-v2.png",
    imageAlt: "An Indian couple having a calm, meaningful conversation together",
  },
  {
    icon: "hands",
    slug: "special-parents-counseling",
    title: "Special Parents Counseling",
    description: "Practical, empathetic care for parents navigating unique family needs.",
    intro: "Dedicated emotional and practical support for parents caring for children with developmental, behavioural or additional needs.",
    helpsWith: ["Caregiver stress and emotional fatigue", "Acceptance, grief and uncertainty", "Family communication and shared caregiving", "Sustainable routines, boundaries and self-care"],
    approach: "Support honours both the child’s needs and the parent’s well-being, with realistic strategies that fit daily family life.",
    tint: "bg-[#F8F1E8]",
    accent: "sand",
    number: "05",
    image: "/images/service-family-v2.png",
    imageAlt: "An Indian mother listening supportively to her child on a shaded verandah",
  },
  {
    icon: "briefcase",
    slug: "workplace-career-counseling",
    title: "Workplace & Career Counseling",
    description: "Clarity for burnout, workplace stress and meaningful career decisions.",
    intro: "Professional support for the emotional demands of work, from chronic stress and conflict to career direction and transition.",
    helpsWith: ["Burnout and workplace anxiety", "Difficult professional relationships", "Boundaries and work–life balance", "Career decisions, confidence and change"],
    approach: "Sessions connect emotional insight with practical decisions, helping you protect capacity and act with greater clarity.",
    tint: "bg-[#EAF5F3]",
    accent: "teal",
    number: "06",
    image: "/images/service-workplace-v2.png",
    imageAlt: "An Indian professional discussing workplace concerns with a career counsellor",
  },
  {
    icon: "chart",
    slug: "psychological-assessments",
    title: "Psychological Assessments",
    description: "Professional assessments approached with care, context and clarity.",
    intro: "Structured psychological assessment can bring clarity to concerns and inform appropriate support, recommendations or next steps.",
    helpsWith: ["Emotional and behavioural concerns", "Personality and well-being insights", "Clarifying support needs", "Professional discussion of assessment findings"],
    approach: "Assessment is conducted ethically and interpreted in context. Results are explained clearly and are never treated as a label in isolation.",
    tint: "bg-[#EDF4FB]",
    accent: "slate",
    number: "07",
    image: "/images/service-assessments-v2.png",
    imageAlt: "An Indian psychologist explaining an assessment clearly to a client",
  },
  {
    icon: "workshop",
    slug: "workshops-training",
    title: "Workshops & Training",
    description: "Engaging well-being programmes for schools, teams and communities.",
    intro: "Thoughtful, participatory programmes that make psychological knowledge practical for schools, workplaces and community groups.",
    helpsWith: ["Stress management and resilience", "Communication and emotional intelligence", "Student, parent and teacher well-being", "Workplace mental-health awareness"],
    approach: "Each programme is shaped around the audience, setting and desired outcomes, with accessible learning and practical takeaways.",
    tint: "bg-[#F6EFF5]",
    accent: "rose",
    number: "08",
    image: "/images/service-workshops-v2.png",
    imageAlt: "Indian adults participating in a supportive well-being workshop",
  },
] as const;

export const assessments = [
  { title: "Depression", slug: "depression", description: "Low mood, interest and energy" },
  { title: "Anxiety", slug: "anxiety", description: "Worry, unease and physical tension" },
  { title: "Stress", slug: "stress", description: "Pressure, overload and difficulty relaxing" },
  { title: "Burnout", slug: "burnout", description: "Exhaustion and reduced capacity" },
  { title: "Sleep Quality", slug: "sleep-quality", description: "Sleep changes linked to well-being" },
  { title: "Self-Esteem", slug: "self-esteem", description: "Self-worth and critical thoughts" },
  { title: "Social Anxiety", slug: "social-anxiety", description: "Anxiety around people and situations" },
  { title: "Emotional Well-being", slug: "emotional-wellbeing", description: "A broad emotional health check-in" },
] as const;

export const processSteps = [
  {
    title: "Choose your support",
    description: "Explore the service that best reflects what you need right now.",
  },
  {
    title: "Book a convenient time",
    description: "Select an online or in-person appointment that works for you.",
  },
  {
    title: "Attend your confidential session",
    description: "Meet in a safe setting where your story is treated with care.",
  },
  {
    title: "Build a practical way forward",
    description: "Leave with insight, grounded tools and a plan shaped around you.",
  },
] as const;

export const trustPoints = [
  "Compassionate and non-judgmental care",
  "Personalised counseling plans",
  "Evidence-based approaches",
  "Professional psychological assessments",
  "Online and in-person consultations",
  "Ethical and confidential practice",
  "Support available in multiple languages",
] as const;

export const testimonials = [
  {
    id: "gayathri-safety",
    quote:
      "From the very first session, Manjubashini Ma’am created an environment in which I felt completely at ease sharing my thoughts and emotions. Her warmth and genuine kindness immediately fostered a sense of safety and support. She listens not only with her ears but with her heart, and her patience makes even difficult conversations feel effortless.",
    attribution: "Gayathri, Nanganallur",
  },
  {
    id: "gayathri-progress",
    quote:
      "She helped me understand my behavioural patterns, identify the roots of my struggles and use practical solutions that brought tangible results. The CBT exercises and journaling techniques have been transformative. Her support quietly makes a profound difference in the way you see yourself and your life.",
    attribution: "Gayathri, Nanganallur",
  },
  {
    id: "kalaivani",
    quote:
      "Manju ma’am is one of the angels in my life. She showed me the positive side of the world and helped me change the way I looked at my problems. Very grateful for her forever. Every person, especially women facing a downfall, must have a session with her.",
    attribution: "Kalaivani Eswaran",
  },
  {
    id: "priya",
    quote:
      "I recommended one of my friends here and she felt very comfortable after sharing her problem. The psychologist has great listening skills, is calm and handles issues professionally. She takes the required time, guides thoroughly and brought a lot of positivity into my friend’s life. Highly recommended.",
    attribution: "Priya, Chennai",
  },
  {
    id: "rathinam",
    quote:
      "Any problem that needs to be thought out loud needs a compassionate ear and someone to guide you on the right path. The discussion has a healing touch. Thank you for all the support.",
    attribution: "Rathinam N K",
  },
  {
    id: "anandhi",
    quote: "She is an optimistic person who made my life fabulous after hardships in mental health and family life through her counselling. Now my husband, son and I are leading a productive and happy life. Thank you, Madam Manju, for your dedication and full effort.",
    attribution: "Anandhi B., Thiruvannamalai",
  },
  {
    id: "chandrika",
    quote: "Highly recommended for all sorts of counselling, including marital and child counselling. Ma’am is very patient in listening to all your issues and provides clear guidance. Kudos to Madam for helping many people lead their lives happily.",
    attribution: "Chandrika Gururajan, Chennai",
  },
] as const;

export const resources = [
  {
    slug: "making-space-for-feelings",
    category: "Emotional Awareness",
    title: "Making Space for Feelings Without Letting Them Take Over",
    excerpt: "A practical guide to noticing emotions, listening to what they signal and responding with more steadiness.",
    time: "6 min read",
    image: "/images/blog-emotions.png",
    imageAlt: "A woman pausing thoughtfully with tea and a journal beside a sunlit window",
    intro: "Feelings can be intense without being dangerous. Learning to make room for them helps us respond with choice instead of reacting on impulse.",
    sections: [
      { heading: "Name what is here", paragraphs: ["Begin with simple, neutral language: ‘I notice sadness,’ ‘My body feels tense,’ or ‘I am having the thought that I cannot cope.’ Naming an experience creates a little distance from it without dismissing it.", "Try to avoid judging the feeling as good, bad, weak or unreasonable. Emotions are information. They may point to a need, a boundary, a loss or something that matters deeply to you."] },
      { heading: "Let the body settle first", paragraphs: ["When emotion is strong, insight can wait. Place both feet on the floor, lengthen your exhale and notice five ordinary things around you. A calmer nervous system makes reflection easier."] },
      { heading: "Choose a response, not an escape", paragraphs: ["Ask: ‘What would be a kind and useful next step?’ It might be taking a break, writing down what happened, asking for support or setting a boundary. The goal is not to remove the feeling immediately, but to stop it from making every decision for you."] },
    ],
    takeaway: "You do not have to solve every emotion. Notice it, steady yourself and choose one caring next step.",
  },
  {
    slug: "managing-stress-without-ignoring-it",
    category: "Emotional Well-being",
    title: "Managing Stress Without Ignoring It",
    excerpt: "A gentler, more practical way to notice stress and respond before it becomes overwhelming.",
    time: "5 min read",
    image: "/images/blog-stress.png",
    imageAlt: "A professional taking a restorative pause at a desk beside a bright window",
    intro: "Stress is often a sensible response to too many demands. The aim is not to become endlessly productive, but to recognise pressure early and protect your capacity.",
    sections: [
      { heading: "Notice your early signals", paragraphs: ["Stress may first appear as a tight jaw, shallow breathing, irritability, headaches, forgetfulness or the urge to rush. Write down the signs that tend to show up for you. Early signals are easier to respond to than full exhaustion."] },
      { heading: "Separate pressure from priority", paragraphs: ["List what is demanding your attention, then mark what is urgent, what can wait and what can be shared. A long list can feel like one emergency; sorting it restores proportion.", "Choose one task that is both small and meaningful. Completing it can reduce mental noise more effectively than repeatedly scanning everything that remains."] },
      { heading: "Build recovery into the day", paragraphs: ["Recovery is not a reward for finishing everything. Brief pauses, food, water, movement and contact with someone safe help your nervous system return to baseline. Small recovery periods are useful even when the source of stress cannot change immediately."] },
    ],
    takeaway: "Respond to stress while it is still a signal, not only after it has become exhaustion.",
  },
  {
    slug: "helping-teenagers-communicate",
    category: "Parenting",
    title: "Helping Teenagers Communicate Their Emotions",
    excerpt: "Simple ways to make difficult conversations feel safer, steadier and more connected.",
    time: "7 min read",
    image: "/images/blog-teens.png",
    imageAlt: "A parent and teenager sharing a calm conversation on a green verandah",
    intro: "Teenagers are more likely to talk when a conversation feels safe, respectful and free from immediate correction. Connection usually comes before advice.",
    sections: [
      { heading: "Choose the moment with care", paragraphs: ["Side-by-side moments—during a walk, a drive or a simple shared activity—can feel less intense than a formal face-to-face talk. Ask whether now is a good time instead of demanding an immediate explanation."] },
      { heading: "Listen for the feeling underneath", paragraphs: ["Reflect what you hear before solving: ‘That sounds disappointing,’ or ‘It makes sense that you felt left out.’ You do not have to agree with every interpretation to take the emotion seriously.", "Questions such as ‘Do you want me to listen or help you think through options?’ give a teenager more ownership of the conversation."] },
      { heading: "Keep the door open", paragraphs: ["If they do not want to talk, stay calm and available: ‘You do not have to tell me now. I am here when you are ready.’ Consistent, low-pressure availability builds trust over time."] },
    ],
    takeaway: "A calm, curious response teaches a teenager that difficult feelings can be shared without losing connection.",
  },
  {
    slug: "healthier-work-life-balance",
    category: "Workplace Wellness",
    title: "Creating a Healthier Work–Life Balance",
    excerpt: "Boundaries and reflective practices that protect energy without adding more pressure.",
    time: "6 min read",
    image: "/images/blog-balance.png",
    imageAlt: "A professional calmly closing a laptop at the end of the workday",
    intro: "Balance is not a perfect division of hours. It is the ability to give work an appropriate place without allowing it to occupy every part of life.",
    sections: [
      { heading: "Create an ending ritual", paragraphs: ["Choose a short action that signals the workday is over: write tomorrow’s first task, close every work tab, put the laptop away or take a brief walk. Repetition helps the mind shift roles."] },
      { heading: "Make boundaries visible", paragraphs: ["A boundary works best when it is specific and communicated: when you will respond, which situations are genuinely urgent and what capacity you have. Quietly hoping others will notice overload often leads to resentment.", "Start with one boundary you can keep consistently. Reliability matters more than creating many rules at once."] },
      { heading: "Protect what restores you", paragraphs: ["Rest is broader than sleep. Time with people you trust, movement, creativity, spiritual practice and unstructured quiet can all replenish different parts of you. Put at least one restorative activity into the week before the space disappears."] },
    ],
    takeaway: "Healthy balance comes from repeatable transitions and boundaries—not from waiting for work to become less demanding.",
  },
] as const;

export const faqs = [
  {
    question: "What happens during a counseling session?",
    answer:
      "Your first session is a calm, confidential conversation about what brings you in, what you hope will change and what support may suit you. You set the pace, and there is no pressure to share more than you are ready for.",
  },
  {
    question: "Is counseling confidential?",
    answer:
      "Yes. Your privacy is central to our practice. Your counselor will also explain the limited legal and safety exceptions to confidentiality clearly before you begin.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "There is no fixed number. Some people benefit from a few focused sessions, while others prefer ongoing support. Together, we review your goals and progress regularly.",
  },
  {
    question: "Is online counseling available?",
    answer:
      "Yes. Secure online sessions are available alongside in-person appointments, allowing you to choose the format that feels most accessible and comfortable.",
  },
  {
    question: "Who can benefit from counseling?",
    answer:
      "Counseling can support anyone seeking greater clarity, emotional resilience, healthier relationships or help through a difficult season—there is no need to wait for a crisis.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Use any Book an Appointment button on this page, call us or send a WhatsApp message. We will help you choose the right service and a convenient time.",
  },
] as const;
