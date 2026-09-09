export const checkInQuestions = [
  { id: 'year', label: 'What year are you in?', options: ['1st year', '2nd year', '3rd year', '4th year', 'Postgraduate'] },
  { id: 'pressure', label: 'How often do you experience pressure to fit in?', options: ['Never', 'Sometimes', 'Often', 'Very often'] },
  { id: 'context', label: 'Where does pressure show up most?', options: ['Parties or social events', 'Hostel or roommates', 'Senior groups', 'Online or group chats', 'Exam stress'] },
  { id: 'confidence', label: 'How confident do you feel saying no?', options: ['Not yet confident', 'A little confident', 'Mostly confident', 'Very confident'] },
  { id: 'focus', label: 'What would help most right now?', options: ['Practice a response', 'Manage pressure', 'Find healthy alternatives', 'Talk to someone', 'Improve campus culture'] },
] as const

export const scenarios = [
  { prompt: 'Come on, just try it. Everyone does it.', context: 'A friend keeps pushing at a small hangout.', options: [{ label: 'Say clearly: “No, I’m not interested.”', score: 10, feedback: 'A clear boundary is brief, direct, and does not invite negotiation.' }, { label: 'Laugh it off and stay quiet.', score: 4, feedback: 'Staying quiet can feel safer, but your boundary may not be understood.' }, { label: 'Ask everyone to stop talking about it.', score: 7, feedback: 'Changing the focus can work, especially when paired with a clear boundary.' }] },
  { prompt: 'Everyone is drinking at the party. Don’t be boring.', context: 'A group is teasing you near the door.', options: [{ label: 'Suggest a different activity you would enjoy.', score: 9, feedback: 'Offering a positive alternative keeps your choice social and confident.' }, { label: 'Stay because you do not want to be left out.', score: 3, feedback: 'Belonging matters, but you can choose company and activities that respect you.' }, { label: 'Call a trusted friend and leave together.', score: 10, feedback: 'Support makes it easier to leave a high-pressure situation.' }] },
  { prompt: 'You need something to relax after exams.', context: 'A senior frames participation as the easiest way to cope.', options: [{ label: 'Say you are stressed and choose a healthy reset instead.', score: 10, feedback: 'Naming the real need creates room for a safer solution.' }, { label: 'Change the subject immediately.', score: 6, feedback: 'Redirecting can help, though a direct boundary may make your choice clearer.' }, { label: 'Agree because everyone seems relaxed.', score: 2, feedback: 'Other people’s appearance does not tell you what is right for your body or situation.' }] },
] as const

export type Resource = { category: string; title: string; description: string; type: string; href?: string }

export const resources: Resource[] = [
  { category: 'Peer pressure', title: 'Practice a respectful refusal', description: 'A short boundary, an alternative, and a trusted person can help you keep your choice.', type: 'PeerShield tool' },
  { category: 'Tobacco', title: 'National Tobacco Control Programme', description: 'Official Government of India tobacco control information and cessation resources.', type: 'External official resource', href: 'https://ntcp.mohfw.gov.in/' },
  { category: 'Stress', title: 'Reset after a difficult day', description: 'Try a short walk, water, music, breathing, or a conversation before making a pressured choice.', type: 'Healthy coping' },
  { category: 'Getting support', title: 'Emergency help in India', description: 'For an immediate emergency, contact emergency services at 112. PeerShield does not provide emergency response.', type: 'Emergency information' },
] as const
