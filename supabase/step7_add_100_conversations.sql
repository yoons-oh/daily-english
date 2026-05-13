-- STEP7 additional 100 conversations
alter table public.conversations add column if not exists tags text[] default '{}';

select public.insert_conversation_with_lines(
  '카페',
  '카페 실전회화 1',
  '카페 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  101,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '카페',
  '카페 실전회화 2',
  '카페 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  102,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '카페',
  '카페 실전회화 3',
  '카페 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  103,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '카페',
  '카페 실전회화 4',
  '카페 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  104,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '카페',
  '카페 실전회화 5',
  '카페 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  105,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '회사',
  '회사 실전회화 1',
  '회사 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  106,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '회사',
  '회사 실전회화 2',
  '회사 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  107,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '회사',
  '회사 실전회화 3',
  '회사 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  108,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '회사',
  '회사 실전회화 4',
  '회사 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  109,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '회사',
  '회사 실전회화 5',
  '회사 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  110,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '병원',
  '병원 실전회화 1',
  '병원 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  111,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '병원',
  '병원 실전회화 2',
  '병원 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  112,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '병원',
  '병원 실전회화 3',
  '병원 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  113,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '병원',
  '병원 실전회화 4',
  '병원 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  114,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '병원',
  '병원 실전회화 5',
  '병원 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  115,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '쇼핑',
  '쇼핑 실전회화 1',
  '쇼핑 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  116,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '쇼핑',
  '쇼핑 실전회화 2',
  '쇼핑 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  117,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '쇼핑',
  '쇼핑 실전회화 3',
  '쇼핑 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  118,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '쇼핑',
  '쇼핑 실전회화 4',
  '쇼핑 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  119,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '쇼핑',
  '쇼핑 실전회화 5',
  '쇼핑 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  120,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '택시',
  '택시 실전회화 1',
  '택시 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  121,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '택시',
  '택시 실전회화 2',
  '택시 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  122,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '택시',
  '택시 실전회화 3',
  '택시 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  123,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '택시',
  '택시 실전회화 4',
  '택시 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  124,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '택시',
  '택시 실전회화 5',
  '택시 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  125,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '호텔',
  '호텔 실전회화 1',
  '호텔 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  126,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '호텔',
  '호텔 실전회화 2',
  '호텔 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  127,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '호텔',
  '호텔 실전회화 3',
  '호텔 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  128,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '호텔',
  '호텔 실전회화 4',
  '호텔 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  129,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '호텔',
  '호텔 실전회화 5',
  '호텔 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  130,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '공항',
  '공항 실전회화 1',
  '공항 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  131,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '공항',
  '공항 실전회화 2',
  '공항 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  132,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '공항',
  '공항 실전회화 3',
  '공항 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  133,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '공항',
  '공항 실전회화 4',
  '공항 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  134,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '공항',
  '공항 실전회화 5',
  '공항 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  135,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '친구',
  '친구 실전회화 1',
  '친구 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  136,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '친구',
  '친구 실전회화 2',
  '친구 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  137,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '친구',
  '친구 실전회화 3',
  '친구 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  138,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '친구',
  '친구 실전회화 4',
  '친구 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  139,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '친구',
  '친구 실전회화 5',
  '친구 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  140,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '헬스장',
  '헬스장 실전회화 1',
  '헬스장 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  141,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '헬스장',
  '헬스장 실전회화 2',
  '헬스장 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  142,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '헬스장',
  '헬스장 실전회화 3',
  '헬스장 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  143,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '헬스장',
  '헬스장 실전회화 4',
  '헬스장 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  144,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '헬스장',
  '헬스장 실전회화 5',
  '헬스장 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  145,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '편의점',
  '편의점 실전회화 1',
  '편의점 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  146,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '편의점',
  '편의점 실전회화 2',
  '편의점 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  147,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '편의점',
  '편의점 실전회화 3',
  '편의점 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  148,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '편의점',
  '편의점 실전회화 4',
  '편의점 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  149,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '편의점',
  '편의점 실전회화 5',
  '편의점 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  150,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '은행',
  '은행 실전회화 1',
  '은행 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  151,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '은행',
  '은행 실전회화 2',
  '은행 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  152,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '은행',
  '은행 실전회화 3',
  '은행 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  153,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '은행',
  '은행 실전회화 4',
  '은행 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  154,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '은행',
  '은행 실전회화 5',
  '은행 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  155,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '배달',
  '배달 실전회화 1',
  '배달 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  156,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '배달',
  '배달 실전회화 2',
  '배달 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  157,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '배달',
  '배달 실전회화 3',
  '배달 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  158,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '배달',
  '배달 실전회화 4',
  '배달 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  159,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '배달',
  '배달 실전회화 5',
  '배달 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  160,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '미용실',
  '미용실 실전회화 1',
  '미용실 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  161,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '미용실',
  '미용실 실전회화 2',
  '미용실 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  162,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '미용실',
  '미용실 실전회화 3',
  '미용실 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  163,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '미용실',
  '미용실 실전회화 4',
  '미용실 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  164,
  '[{"speaker": "A", "line_order": 1, "english_text": "Did you already order the food?", "korean_text": "Did you already order the food?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "아직. 메뉴 보고 있었어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '미용실',
  '미용실 실전회화 5',
  '미용실 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  165,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '학교',
  '학교 실전회화 1',
  '학교 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  166,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '학교',
  '학교 실전회화 2',
  '학교 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  167,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '학교',
  '학교 실전회화 3',
  '학교 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  168,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '학교',
  '학교 실전회화 4',
  '학교 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  169,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '학교',
  '학교 실전회화 5',
  '학교 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  170,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '약국',
  '약국 실전회화 1',
  '약국 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  171,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '약국',
  '약국 실전회화 2',
  '약국 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  172,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '약국',
  '약국 실전회화 3',
  '약국 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  173,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '약국',
  '약국 실전회화 4',
  '약국 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  174,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '약국',
  '약국 실전회화 5',
  '약국 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  175,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '식당',
  '식당 실전회화 1',
  '식당 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  176,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '식당',
  '식당 실전회화 2',
  '식당 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  177,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '식당',
  '식당 실전회화 3',
  '식당 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  178,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '식당',
  '식당 실전회화 4',
  '식당 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  179,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '식당',
  '식당 실전회화 5',
  '식당 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  180,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '지하철',
  '지하철 실전회화 1',
  '지하철 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  181,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '지하철',
  '지하철 실전회화 2',
  '지하철 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  182,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '지하철',
  '지하철 실전회화 3',
  '지하철 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  183,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '지하철',
  '지하철 실전회화 4',
  '지하철 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  184,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '지하철',
  '지하철 실전회화 5',
  '지하철 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  185,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '집',
  '집 실전회화 1',
  '집 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  186,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '집',
  '집 실전회화 2',
  '집 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  187,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '집',
  '집 실전회화 3',
  '집 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  188,
  '[{"speaker": "A", "line_order": 1, "english_text": "How are you feeling now?", "korean_text": "How are you feeling now?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "훨씬 나아졌어.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '집',
  '집 실전회화 4',
  '집 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  189,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '집',
  '집 실전회화 5',
  '집 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  190,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '날씨',
  '날씨 실전회화 1',
  '날씨 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  191,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '날씨',
  '날씨 실전회화 2',
  '날씨 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  192,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '날씨',
  '날씨 실전회화 3',
  '날씨 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  193,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '날씨',
  '날씨 실전회화 4',
  '날씨 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  194,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '날씨',
  '날씨 실전회화 5',
  '날씨 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  195,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '온라인주문',
  '온라인주문 실전회화 1',
  '온라인주문 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  196,
  '[{"speaker": "A", "line_order": 1, "english_text": "Excuse me, is this the right way?", "korean_text": "Excuse me, is this the right way?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "네, 쭉 가면 돼요.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '온라인주문',
  '온라인주문 실전회화 2',
  '온라인주문 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  197,
  '[{"speaker": "A", "line_order": 1, "english_text": "Can we move it to tomorrow?", "korean_text": "Can we move it to tomorrow?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 내일이 더 좋아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '온라인주문',
  '온라인주문 실전회화 3',
  '온라인주문 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  198,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '온라인주문',
  '온라인주문 실전회화 4',
  '온라인주문 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  199,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);


select public.insert_conversation_with_lines(
  '온라인주문',
  '온라인주문 실전회화 5',
  '온라인주문 상황에서 실제로 자주 사용하는 짧고 자연스러운 회화',
  200,
  '[{"speaker": "A", "line_order": 1, "english_text": "Hey, are we still meeting at seven?", "korean_text": "are we still meeting at seven?"}, {"speaker": "B", "line_order": 2, "english_text": "Yeah, give me a second.", "korean_text": "응, 잠깐만."}, {"speaker": "A", "line_order": 3, "english_text": "No problem.", "korean_text": "괜찮아."}, {"speaker": "B", "line_order": 4, "english_text": "응, 근데 조금 늦을 것 같아.", "korean_text": "Yeah, I think so."}, {"speaker": "A", "line_order": 5, "english_text": "Sounds good.", "korean_text": "좋네."}, {"speaker": "B", "line_order": 6, "english_text": "I’ll text you later.", "korean_text": "나중에 문자할게."}, {"speaker": "A", "line_order": 7, "english_text": "Okay, see you.", "korean_text": "알겠어, 나중에 봐."}, {"speaker": "B", "line_order": 8, "english_text": "See you.", "korean_text": "봐."}]'::jsonb
);
