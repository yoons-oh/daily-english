-- STEP 3: 오늘의 대화 자동 추천 + 오리지널 콘텐츠 30개 추가
-- Supabase SQL Editor에서 전체 실행하세요.
-- 기존 테이블은 유지하고, 콘텐츠만 추가합니다.

-- 추천용 정렬 컬럼 보강
alter table public.conversations
add column if not exists order_no int default 0;

-- 중복 방지를 위한 제목 유니크 인덱스
create unique index if not exists conversations_title_unique_idx
on public.conversations(title);

create unique index if not exists categories_name_unique_idx
on public.categories(name);

-- 카테고리 추가
insert into public.categories (name, description, order_no)
values
('관리사무소 문의', '아파트 관리사무소에 생활 문제를 문의하는 대화', 4),
('병원 접수', '병원에서 접수하고 증상을 간단히 말하는 대화', 5),
('약국에서 약 사기', '약국에서 증상에 맞는 약을 사는 대화', 6),
('직장에서 업무 요청하기', '동료에게 업무를 부탁하거나 확인하는 대화', 7),
('회의 일정 조율하기', '회의 시간을 정하거나 바꾸는 대화', 8),
('환불 요청하기', '매장에서 환불이나 교환을 요청하는 대화', 9),
('호텔 문제 요청하기', '호텔에서 객실 문제를 요청하는 대화', 10),
('택시 타기', '택시를 타고 목적지를 말하는 대화', 11),
('온라인 주문 문의', '온라인 주문 상태를 문의하는 대화', 12),
('친구 초대하기', '친구를 집이나 약속에 초대하는 대화', 13),
('약속 거절하기', '정중하게 약속을 거절하거나 미루는 대화', 14),
('분실물 찾기', '잃어버린 물건을 찾는 대화', 15),
('음식이 잘못 나왔을 때', '주문한 음식이 다르게 나왔을 때 말하는 대화', 16),
('운동 등록 문의', '헬스장이나 운동 수업을 문의하는 대화', 17),
('미용실 예약하기', '미용실 예약과 원하는 스타일을 말하는 대화', 18),
('은행 업무 보기', '은행에서 간단한 업무를 보는 대화', 19),
('세탁소 맡기기', '세탁소에 옷을 맡기고 요청하는 대화', 20),
('부동산 집 보기', '집을 보러 가서 조건을 묻는 대화', 21),
('휴대폰 매장 문의', '휴대폰 요금제나 기기 문의 대화', 22),
('아이 학교 상담', '학교나 학원에 간단히 문의하는 대화', 23),
('자동차 정비 문의', '차량 점검이나 수리를 문의하는 대화', 24),
('비 오는 날 일정 변경', '날씨 때문에 약속을 조정하는 대화', 25),
('엘리베이터 이웃 대화', '이웃과 짧게 안부를 나누는 대화', 26),
('편의점에서 물건 찾기', '편의점에서 물건 위치를 묻는 대화', 27),
('공항 체크인', '공항에서 체크인하고 짐을 부치는 대화', 28),
('지하철 길 묻기', '지하철 노선이나 환승을 묻는 대화', 29),
('택배 받기', '택배 수령과 위치 확인 대화', 30),
('카페 주문하기', '카페에서 음료를 자연스럽게 주문하는 대화', 31),
('음식 배달 주문하기', '배달 음식을 고르고 주문할 때 쓰는 대화', 32)
on conflict (name) do update
set description = excluded.description,
    order_no = excluded.order_no;

-- 콘텐츠 삽입 함수
create or replace function public.insert_conversation_with_lines(
  p_category_name text,
  p_title text,
  p_situation text,
  p_order_no int,
  p_lines jsonb
)
returns void
language plpgsql
security definer
as $$
declare
  v_category_id uuid;
  v_conversation_id uuid;
  v_line jsonb;
begin
  select id into v_category_id
  from public.categories
  where name = p_category_name
  limit 1;

  insert into public.conversations (
    category_id, title, situation, difficulty, turn_count, is_active, order_no
  )
  values (
    v_category_id, p_title, p_situation, 'beginner', jsonb_array_length(p_lines), true, p_order_no
  )
  on conflict (title) do update
  set category_id = excluded.category_id,
      situation = excluded.situation,
      difficulty = excluded.difficulty,
      turn_count = excluded.turn_count,
      is_active = true,
      order_no = excluded.order_no
  returning id into v_conversation_id;

  delete from public.dialogue_lines
  where conversation_id = v_conversation_id;

  for v_line in select * from jsonb_array_elements(p_lines)
  loop
    insert into public.dialogue_lines (
      conversation_id, speaker, line_order, english_text, korean_text
    )
    values (
      v_conversation_id,
      v_line->>'speaker',
      (v_line->>'line_order')::int,
      v_line->>'english_text',
      v_line->>'korean_text'
    );
  end loop;
end;
$$;


select public.insert_conversation_with_lines(
  '카페 주문하기',
  '따뜻한 라떼 주문하기',
  '카페에서 음료를 고르고 옵션을 말하는 상황',
  1,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, can I get a latte?","korean_text":"안녕하세요, 라떼 하나 주세요."},
  {"speaker":"B","line_order":2,"english_text":"Sure. Hot or iced?","korean_text":"네. 따뜻한 걸로 드릴까요, 아이스로 드릴까요?"},
  {"speaker":"A","line_order":3,"english_text":"Hot, please.","korean_text":"따뜻한 걸로 주세요."},
  {"speaker":"B","line_order":4,"english_text":"What size would you like?","korean_text":"어떤 사이즈로 드릴까요?"},
  {"speaker":"A","line_order":5,"english_text":"Medium is fine.","korean_text":"미디엄이면 괜찮아요."},
  {"speaker":"B","line_order":6,"english_text":"Do you want it for here or to go?","korean_text":"드시고 가세요, 아니면 가져가세요?"},
  {"speaker":"A","line_order":7,"english_text":"To go, please.","korean_text":"가져갈게요."},
  {"speaker":"B","line_order":8,"english_text":"Great. That’ll be ready in a minute.","korean_text":"좋아요. 금방 준비해드릴게요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '카페 주문하기',
  '카페에서 덜 달게 주문하기',
  '음료를 주문하면서 당도를 조절하는 상황',
  2,
  '[
  {"speaker":"A","line_order":1,"english_text":"Can I get an iced vanilla latte?","korean_text":"아이스 바닐라 라떼 하나 주세요."},
  {"speaker":"B","line_order":2,"english_text":"Of course. What size?","korean_text":"네. 사이즈는 어떻게 드릴까요?"},
  {"speaker":"A","line_order":3,"english_text":"Small, please.","korean_text":"스몰로 주세요."},
  {"speaker":"B","line_order":4,"english_text":"Anything else?","korean_text":"또 필요한 거 있으세요?"},
  {"speaker":"A","line_order":5,"english_text":"Can you make it less sweet?","korean_text":"덜 달게 해주실 수 있나요?"},
  {"speaker":"B","line_order":6,"english_text":"Sure, we can do half syrup.","korean_text":"네, 시럽을 반만 넣어드릴 수 있어요."},
  {"speaker":"A","line_order":7,"english_text":"That sounds perfect.","korean_text":"그거 좋네요."},
  {"speaker":"B","line_order":8,"english_text":"Okay. I’ll call your name when it’s ready.","korean_text":"네. 준비되면 이름 불러드릴게요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '음식 배달 주문하기',
  '저녁 메뉴 고르기',
  '친구와 저녁 배달 메뉴를 고르는 상황',
  3,
  '[
  {"speaker":"A","line_order":1,"english_text":"I’m getting hungry.","korean_text":"나 배고파지네."},
  {"speaker":"B","line_order":2,"english_text":"Same here. Want to order something?","korean_text":"나도. 뭐 주문할까?"},
  {"speaker":"A","line_order":3,"english_text":"Yeah. What sounds good?","korean_text":"응. 뭐가 괜찮을까?"},
  {"speaker":"B","line_order":4,"english_text":"Maybe chicken?","korean_text":"치킨 어때?"},
  {"speaker":"A","line_order":5,"english_text":"Chicken sounds good, but not too spicy.","korean_text":"치킨 좋다. 근데 너무 맵지 않은 걸로."},
  {"speaker":"B","line_order":6,"english_text":"Okay. I’ll pick a mild one.","korean_text":"알겠어. 순한 걸로 고를게."},
  {"speaker":"A","line_order":7,"english_text":"Can we add fries too?","korean_text":"감자튀김도 추가할 수 있어?"},
  {"speaker":"B","line_order":8,"english_text":"Sure. I’ll order now.","korean_text":"응. 지금 주문할게."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '택배 받기',
  '문 앞 택배 확인하기',
  '택배 기사와 배송 위치를 확인하는 상황',
  4,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I have a package for you.","korean_text":"안녕하세요, 택배가 있습니다."},
  {"speaker":"B","line_order":2,"english_text":"Oh, thank you. Is it at the door?","korean_text":"아, 감사합니다. 문 앞에 있나요?"},
  {"speaker":"A","line_order":3,"english_text":"Yes, I left it by your front door.","korean_text":"네, 현관문 앞에 두었습니다."},
  {"speaker":"B","line_order":4,"english_text":"Great. Do I need to sign anything?","korean_text":"좋아요. 서명해야 하나요?"},
  {"speaker":"A","line_order":5,"english_text":"No, you’re all set.","korean_text":"아니요, 괜찮습니다."},
  {"speaker":"B","line_order":6,"english_text":"Thanks for letting me know.","korean_text":"알려주셔서 감사합니다."},
  {"speaker":"A","line_order":7,"english_text":"No problem. Have a good day.","korean_text":"별말씀을요. 좋은 하루 보내세요."},
  {"speaker":"B","line_order":8,"english_text":"You too.","korean_text":"기사님도요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '관리사무소 문의',
  '물이 새는 문제 말하기',
  '집에서 물이 새서 관리사무소에 문의하는 상황',
  5,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I’m calling about a leak in my bathroom.","korean_text":"안녕하세요, 화장실 누수 때문에 전화드렸어요."},
  {"speaker":"B","line_order":2,"english_text":"I’m sorry to hear that. Where is it leaking?","korean_text":"불편하시겠어요. 어디에서 물이 새나요?"},
  {"speaker":"A","line_order":3,"english_text":"It looks like it’s coming from the ceiling.","korean_text":"천장에서 새는 것 같아요."},
  {"speaker":"B","line_order":4,"english_text":"Okay. Is it a lot of water?","korean_text":"알겠습니다. 물이 많이 새나요?"},
  {"speaker":"A","line_order":5,"english_text":"Not a lot, but it keeps dripping.","korean_text":"많지는 않은데 계속 떨어져요."},
  {"speaker":"B","line_order":6,"english_text":"We’ll send someone to check it today.","korean_text":"오늘 점검하러 사람을 보내겠습니다."},
  {"speaker":"A","line_order":7,"english_text":"That would be great. Thank you.","korean_text":"그러면 좋겠어요. 감사합니다."},
  {"speaker":"B","line_order":8,"english_text":"You’re welcome. We’ll call before we come.","korean_text":"천만에요. 방문 전에 전화드릴게요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '병원 접수',
  '처음 병원 접수하기',
  '병원 데스크에서 처음 접수하는 상황',
  6,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I’d like to see a doctor.","korean_text":"안녕하세요, 진료를 받고 싶어요."},
  {"speaker":"B","line_order":2,"english_text":"Sure. Do you have an appointment?","korean_text":"네. 예약하셨나요?"},
  {"speaker":"A","line_order":3,"english_text":"No, I don’t.","korean_text":"아니요, 예약은 안 했어요."},
  {"speaker":"B","line_order":4,"english_text":"That’s okay. Can I have your name?","korean_text":"괜찮습니다. 성함 알려주시겠어요?"},
  {"speaker":"A","line_order":5,"english_text":"Yes, it’s Minho Kim.","korean_text":"네, 김민호입니다."},
  {"speaker":"B","line_order":6,"english_text":"What seems to be the problem?","korean_text":"어디가 불편하신가요?"},
  {"speaker":"A","line_order":7,"english_text":"I have a sore throat and a cough.","korean_text":"목이 아프고 기침이 나요."},
  {"speaker":"B","line_order":8,"english_text":"Okay. Please take a seat over there.","korean_text":"알겠습니다. 저쪽에 앉아서 기다려주세요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '약국에서 약 사기',
  '감기약 사기',
  '약국에서 감기 증상에 맞는 약을 문의하는 상황',
  7,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I think I have a cold.","korean_text":"안녕하세요, 감기인 것 같아요."},
  {"speaker":"B","line_order":2,"english_text":"What symptoms do you have?","korean_text":"증상이 어떻게 되세요?"},
  {"speaker":"A","line_order":3,"english_text":"I have a runny nose and a headache.","korean_text":"콧물이 나고 머리가 아파요."},
  {"speaker":"B","line_order":4,"english_text":"Do you have a fever?","korean_text":"열도 있나요?"},
  {"speaker":"A","line_order":5,"english_text":"No, not really.","korean_text":"아니요, 열은 별로 없어요."},
  {"speaker":"B","line_order":6,"english_text":"Okay. This should help.","korean_text":"알겠습니다. 이 약이 도움이 될 거예요."},
  {"speaker":"A","line_order":7,"english_text":"How often should I take it?","korean_text":"얼마나 자주 먹어야 하나요?"},
  {"speaker":"B","line_order":8,"english_text":"Take it twice a day after meals.","korean_text":"하루 두 번 식후에 드세요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '직장에서 업무 요청하기',
  '자료 보내달라고 부탁하기',
  '동료에게 필요한 자료를 요청하는 상황',
  8,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hey, can you send me the sales file?","korean_text":"저기, 매출 파일 좀 보내줄 수 있어요?"},
  {"speaker":"B","line_order":2,"english_text":"Sure. Do you need it now?","korean_text":"네. 지금 필요하세요?"},
  {"speaker":"A","line_order":3,"english_text":"If possible, yes.","korean_text":"가능하면 네."},
  {"speaker":"B","line_order":4,"english_text":"No problem. I’ll send it in a minute.","korean_text":"문제없어요. 금방 보내드릴게요."},
  {"speaker":"A","line_order":5,"english_text":"Thanks. I need it for the meeting.","korean_text":"고마워요. 회의에 필요해서요."},
  {"speaker":"B","line_order":6,"english_text":"Got it. I’ll include the updated version.","korean_text":"알겠습니다. 업데이트된 버전으로 보낼게요."},
  {"speaker":"A","line_order":7,"english_text":"That would be perfect.","korean_text":"그러면 딱 좋아요."},
  {"speaker":"B","line_order":8,"english_text":"Just sent it to your email.","korean_text":"방금 이메일로 보냈어요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '회의 일정 조율하기',
  '회의 시간 바꾸기',
  '회의 시간이 맞지 않아 조정하는 상황',
  9,
  '[
  {"speaker":"A","line_order":1,"english_text":"Can we move the meeting to 3?","korean_text":"회의를 3시로 옮길 수 있을까요?"},
  {"speaker":"B","line_order":2,"english_text":"Let me check my calendar.","korean_text":"캘린더 좀 확인해볼게요."},
  {"speaker":"A","line_order":3,"english_text":"Sure, no rush.","korean_text":"네, 천천히 보세요."},
  {"speaker":"B","line_order":4,"english_text":"3 works for me.","korean_text":"저는 3시 괜찮아요."},
  {"speaker":"A","line_order":5,"english_text":"Great. I’ll update the invite.","korean_text":"좋아요. 초대 일정을 수정할게요."},
  {"speaker":"B","line_order":6,"english_text":"Thanks. Is it still online?","korean_text":"감사해요. 여전히 온라인 회의인가요?"},
  {"speaker":"A","line_order":7,"english_text":"Yes, same link.","korean_text":"네, 링크는 그대로예요."},
  {"speaker":"B","line_order":8,"english_text":"Okay, see you then.","korean_text":"알겠습니다. 그때 봬요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '환불 요청하기',
  '사이즈가 안 맞아 환불하기',
  '옷 사이즈가 맞지 않아 환불을 요청하는 상황',
  10,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I’d like to return this.","korean_text":"안녕하세요, 이거 환불하고 싶어요."},
  {"speaker":"B","line_order":2,"english_text":"Sure. Was there a problem with it?","korean_text":"네. 문제가 있었나요?"},
  {"speaker":"A","line_order":3,"english_text":"The size doesn’t fit me.","korean_text":"사이즈가 저한테 안 맞아요."},
  {"speaker":"B","line_order":4,"english_text":"Do you have the receipt?","korean_text":"영수증 있으신가요?"},
  {"speaker":"A","line_order":5,"english_text":"Yes, here it is.","korean_text":"네, 여기 있어요."},
  {"speaker":"B","line_order":6,"english_text":"Okay. Do you want a refund or exchange?","korean_text":"알겠습니다. 환불이나 교환 중 어떤 걸 원하세요?"},
  {"speaker":"A","line_order":7,"english_text":"A refund, please.","korean_text":"환불로 부탁드려요."},
  {"speaker":"B","line_order":8,"english_text":"No problem. I’ll process it now.","korean_text":"네. 지금 처리해드릴게요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '호텔 문제 요청하기',
  '방이 너무 추울 때',
  '호텔 객실 온도 문제를 프런트에 말하는 상황',
  11,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, my room is really cold.","korean_text":"안녕하세요, 제 방이 너무 추워요."},
  {"speaker":"B","line_order":2,"english_text":"I’m sorry about that. What room are you in?","korean_text":"불편을 드려 죄송합니다. 객실 번호가 어떻게 되세요?"},
  {"speaker":"A","line_order":3,"english_text":"Room 1208.","korean_text":"1208호예요."},
  {"speaker":"B","line_order":4,"english_text":"Have you tried changing the thermostat?","korean_text":"온도 조절기를 바꿔보셨나요?"},
  {"speaker":"A","line_order":5,"english_text":"Yes, but it’s still cold.","korean_text":"네, 그래도 계속 추워요."},
  {"speaker":"B","line_order":6,"english_text":"Okay. We’ll send someone up to check it.","korean_text":"알겠습니다. 확인하러 직원을 보내드릴게요."},
  {"speaker":"A","line_order":7,"english_text":"Thank you. I’d appreciate it.","korean_text":"감사합니다. 정말 도움이 될 것 같아요."},
  {"speaker":"B","line_order":8,"english_text":"They’ll be there shortly.","korean_text":"곧 도착할 거예요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '택시 타기',
  '목적지 말하기',
  '택시를 타고 목적지를 말하는 상황',
  12,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, can you take me to City Hall?","korean_text":"안녕하세요, 시청까지 가주세요."},
  {"speaker":"B","line_order":2,"english_text":"Sure. Do you want to take the highway?","korean_text":"네. 고속도로로 갈까요?"},
  {"speaker":"A","line_order":3,"english_text":"Is it faster?","korean_text":"그게 더 빠른가요?"},
  {"speaker":"B","line_order":4,"english_text":"Yes, at this time it should be faster.","korean_text":"네, 이 시간에는 더 빠를 거예요."},
  {"speaker":"A","line_order":5,"english_text":"Okay, let’s take the highway.","korean_text":"그럼 고속도로로 가주세요."},
  {"speaker":"B","line_order":6,"english_text":"No problem.","korean_text":"알겠습니다."},
  {"speaker":"A","line_order":7,"english_text":"About how long will it take?","korean_text":"얼마나 걸릴까요?"},
  {"speaker":"B","line_order":8,"english_text":"Around twenty minutes.","korean_text":"20분 정도 걸릴 거예요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '온라인 주문 문의',
  '배송 상태 묻기',
  '온라인 주문한 물건의 배송 상태를 문의하는 상황',
  13,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I’m calling about my order.","korean_text":"안녕하세요, 제 주문 때문에 전화드렸어요."},
  {"speaker":"B","line_order":2,"english_text":"Sure. Do you have the order number?","korean_text":"네. 주문번호가 있으신가요?"},
  {"speaker":"A","line_order":3,"english_text":"Yes, it’s 5821.","korean_text":"네, 5821입니다."},
  {"speaker":"B","line_order":4,"english_text":"Let me check that for you.","korean_text":"확인해드릴게요."},
  {"speaker":"A","line_order":5,"english_text":"Thanks. It hasn’t arrived yet.","korean_text":"감사합니다. 아직 도착하지 않았어요."},
  {"speaker":"B","line_order":6,"english_text":"It looks like it will arrive tomorrow.","korean_text":"내일 도착할 예정으로 보입니다."},
  {"speaker":"A","line_order":7,"english_text":"Okay, thanks for checking.","korean_text":"알겠습니다. 확인해주셔서 감사합니다."},
  {"speaker":"B","line_order":8,"english_text":"You’re welcome.","korean_text":"천만에요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '친구 초대하기',
  '집에 초대하기',
  '친구를 집으로 초대하는 상황',
  14,
  '[
  {"speaker":"A","line_order":1,"english_text":"Are you free this Saturday?","korean_text":"이번 토요일에 시간 있어?"},
  {"speaker":"B","line_order":2,"english_text":"I think so. Why?","korean_text":"아마 있을 것 같아. 왜?"},
  {"speaker":"A","line_order":3,"english_text":"I’m having a small dinner at my place.","korean_text":"우리 집에서 간단히 저녁 먹으려고."},
  {"speaker":"B","line_order":4,"english_text":"That sounds nice.","korean_text":"좋은데."},
  {"speaker":"A","line_order":5,"english_text":"Do you want to come?","korean_text":"올래?"},
  {"speaker":"B","line_order":6,"english_text":"Sure. What time?","korean_text":"좋아. 몇 시에?"},
  {"speaker":"A","line_order":7,"english_text":"Around seven.","korean_text":"7시쯤."},
  {"speaker":"B","line_order":8,"english_text":"Great. I’ll be there.","korean_text":"좋아. 갈게."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '약속 거절하기',
  '정중하게 다음으로 미루기',
  '약속을 바로 거절하지 않고 다음으로 미루는 상황',
  15,
  '[
  {"speaker":"A","line_order":1,"english_text":"Do you want to grab coffee after work?","korean_text":"퇴근 후에 커피 마실래?"},
  {"speaker":"B","line_order":2,"english_text":"I’d love to, but I can’t today.","korean_text":"그러고 싶은데 오늘은 안 될 것 같아."},
  {"speaker":"A","line_order":3,"english_text":"No worries. Busy day?","korean_text":"괜찮아. 바쁜 날이야?"},
  {"speaker":"B","line_order":4,"english_text":"Yeah, I have something to finish.","korean_text":"응, 끝내야 할 일이 있어."},
  {"speaker":"A","line_order":5,"english_text":"Totally understand.","korean_text":"완전 이해해."},
  {"speaker":"B","line_order":6,"english_text":"Can we do it tomorrow instead?","korean_text":"대신 내일은 어때?"},
  {"speaker":"A","line_order":7,"english_text":"Sure, tomorrow works.","korean_text":"좋아, 내일 괜찮아."},
  {"speaker":"B","line_order":8,"english_text":"Great. Thanks for understanding.","korean_text":"좋아. 이해해줘서 고마워."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '분실물 찾기',
  '지갑을 잃어버렸을 때',
  '카페에서 잃어버린 지갑을 찾는 상황',
  16,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, did anyone turn in a wallet?","korean_text":"안녕하세요, 혹시 지갑 맡겨진 거 있나요?"},
  {"speaker":"B","line_order":2,"english_text":"Let me check. What does it look like?","korean_text":"확인해볼게요. 어떻게 생겼나요?"},
  {"speaker":"A","line_order":3,"english_text":"It’s black and small.","korean_text":"검은색 작은 지갑이에요."},
  {"speaker":"B","line_order":4,"english_text":"Where do you think you left it?","korean_text":"어디에 두신 것 같나요?"},
  {"speaker":"A","line_order":5,"english_text":"Maybe on that table by the window.","korean_text":"아마 창가 쪽 테이블에 둔 것 같아요."},
  {"speaker":"B","line_order":6,"english_text":"One moment, please.","korean_text":"잠시만요."},
  {"speaker":"A","line_order":7,"english_text":"Sure.","korean_text":"네."},
  {"speaker":"B","line_order":8,"english_text":"Is this yours?","korean_text":"이거 맞으세요?"}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '음식이 잘못 나왔을 때',
  '주문한 음식 확인하기',
  '식당에서 주문과 다른 음식이 나온 상황',
  17,
  '[
  {"speaker":"A","line_order":1,"english_text":"Excuse me, I think this isn’t my order.","korean_text":"실례합니다, 이거 제 주문이 아닌 것 같아요."},
  {"speaker":"B","line_order":2,"english_text":"Oh, I’m sorry. What did you order?","korean_text":"아, 죄송합니다. 무엇을 주문하셨나요?"},
  {"speaker":"A","line_order":3,"english_text":"I ordered the chicken pasta.","korean_text":"치킨 파스타를 주문했어요."},
  {"speaker":"B","line_order":4,"english_text":"You’re right. This is the seafood pasta.","korean_text":"맞네요. 이건 해산물 파스타예요."},
  {"speaker":"A","line_order":5,"english_text":"No problem.","korean_text":"괜찮아요."},
  {"speaker":"B","line_order":6,"english_text":"I’ll fix that right away.","korean_text":"바로 다시 준비해드릴게요."},
  {"speaker":"A","line_order":7,"english_text":"Thank you.","korean_text":"감사합니다."},
  {"speaker":"B","line_order":8,"english_text":"Sorry about the mix-up.","korean_text":"혼동이 있어서 죄송합니다."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '운동 등록 문의',
  '헬스장 가격 묻기',
  '헬스장에서 등록 비용과 이용 시간을 문의하는 상황',
  18,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I’m interested in joining the gym.","korean_text":"안녕하세요, 헬스장 등록에 관심이 있어요."},
  {"speaker":"B","line_order":2,"english_text":"Great. Have you been here before?","korean_text":"좋습니다. 전에 이용해보신 적 있나요?"},
  {"speaker":"A","line_order":3,"english_text":"No, this is my first time.","korean_text":"아니요, 처음이에요."},
  {"speaker":"B","line_order":4,"english_text":"We have monthly and yearly plans.","korean_text":"월간권과 연간권이 있어요."},
  {"speaker":"A","line_order":5,"english_text":"How much is the monthly plan?","korean_text":"월간권은 얼마인가요?"},
  {"speaker":"B","line_order":6,"english_text":"It’s fifty dollars a month.","korean_text":"한 달에 50달러입니다."},
  {"speaker":"A","line_order":7,"english_text":"Can I use it in the evening?","korean_text":"저녁에도 이용할 수 있나요?"},
  {"speaker":"B","line_order":8,"english_text":"Yes, we’re open until ten.","korean_text":"네, 밤 10시까지 운영합니다."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '미용실 예약하기',
  '머리 자르기 예약',
  '미용실에 전화해 커트 예약을 하는 상황',
  19,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I’d like to make an appointment.","korean_text":"안녕하세요, 예약하고 싶어요."},
  {"speaker":"B","line_order":2,"english_text":"Sure. What service do you need?","korean_text":"네. 어떤 서비스 원하세요?"},
  {"speaker":"A","line_order":3,"english_text":"Just a haircut.","korean_text":"그냥 커트만요."},
  {"speaker":"B","line_order":4,"english_text":"When would you like to come in?","korean_text":"언제 오고 싶으세요?"},
  {"speaker":"A","line_order":5,"english_text":"Do you have anything this afternoon?","korean_text":"오늘 오후에 가능한 시간이 있나요?"},
  {"speaker":"B","line_order":6,"english_text":"We have 4:30 available.","korean_text":"4시 30분 가능합니다."},
  {"speaker":"A","line_order":7,"english_text":"That works for me.","korean_text":"그 시간 괜찮아요."},
  {"speaker":"B","line_order":8,"english_text":"Great. I’ll put you down for 4:30.","korean_text":"좋아요. 4시 30분으로 예약해드릴게요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '은행 업무 보기',
  '카드 재발급 문의',
  '은행에서 카드 재발급을 문의하는 상황',
  20,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I lost my debit card.","korean_text":"안녕하세요, 체크카드를 잃어버렸어요."},
  {"speaker":"B","line_order":2,"english_text":"I’m sorry to hear that. Do you want to block it?","korean_text":"불편하시겠어요. 카드 정지를 원하시나요?"},
  {"speaker":"A","line_order":3,"english_text":"Yes, please.","korean_text":"네, 부탁드려요."},
  {"speaker":"B","line_order":4,"english_text":"Can I see your ID?","korean_text":"신분증 보여주시겠어요?"},
  {"speaker":"A","line_order":5,"english_text":"Sure, here it is.","korean_text":"네, 여기 있습니다."},
  {"speaker":"B","line_order":6,"english_text":"Thank you. We can issue a new card today.","korean_text":"감사합니다. 오늘 새 카드를 발급해드릴 수 있어요."},
  {"speaker":"A","line_order":7,"english_text":"That would be great.","korean_text":"그러면 좋겠어요."},
  {"speaker":"B","line_order":8,"english_text":"Please fill out this form.","korean_text":"이 양식을 작성해주세요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '세탁소 맡기기',
  '셔츠 세탁 맡기기',
  '세탁소에 셔츠를 맡기며 요청하는 상황',
  21,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I’d like to drop off these shirts.","korean_text":"안녕하세요, 이 셔츠들 맡기려고요."},
  {"speaker":"B","line_order":2,"english_text":"Sure. Just regular cleaning?","korean_text":"네. 일반 세탁이면 될까요?"},
  {"speaker":"A","line_order":3,"english_text":"Yes, but this one has a stain.","korean_text":"네, 그런데 이건 얼룩이 있어요."},
  {"speaker":"B","line_order":4,"english_text":"I see it. We’ll try to remove it.","korean_text":"보이네요. 제거해보겠습니다."},
  {"speaker":"A","line_order":5,"english_text":"When can I pick them up?","korean_text":"언제 찾으러 오면 될까요?"},
  {"speaker":"B","line_order":6,"english_text":"They’ll be ready by Friday.","korean_text":"금요일까지 준비됩니다."},
  {"speaker":"A","line_order":7,"english_text":"Great. Thank you.","korean_text":"좋아요. 감사합니다."},
  {"speaker":"B","line_order":8,"english_text":"You’re welcome.","korean_text":"천만에요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '부동산 집 보기',
  '집 보러 가기',
  '부동산에서 집 조건을 묻는 상황',
  22,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I’m here to see the apartment.","korean_text":"안녕하세요, 아파트 보러 왔어요."},
  {"speaker":"B","line_order":2,"english_text":"Great. It’s on the third floor.","korean_text":"좋습니다. 3층에 있어요."},
  {"speaker":"A","line_order":3,"english_text":"Is there an elevator?","korean_text":"엘리베이터가 있나요?"},
  {"speaker":"B","line_order":4,"english_text":"Yes, there is.","korean_text":"네, 있습니다."},
  {"speaker":"A","line_order":5,"english_text":"How much is the rent?","korean_text":"월세는 얼마인가요?"},
  {"speaker":"B","line_order":6,"english_text":"It’s eight hundred a month.","korean_text":"한 달에 800입니다."},
  {"speaker":"A","line_order":7,"english_text":"Are utilities included?","korean_text":"공과금 포함인가요?"},
  {"speaker":"B","line_order":8,"english_text":"No, utilities are separate.","korean_text":"아니요, 공과금은 별도입니다."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '휴대폰 매장 문의',
  '요금제 묻기',
  '휴대폰 매장에서 요금제를 문의하는 상황',
  23,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I’m looking for a new phone plan.","korean_text":"안녕하세요, 새 요금제를 찾고 있어요."},
  {"speaker":"B","line_order":2,"english_text":"Sure. How much data do you usually use?","korean_text":"네. 보통 데이터를 얼마나 쓰세요?"},
  {"speaker":"A","line_order":3,"english_text":"Not too much. Mostly messaging and maps.","korean_text":"많지는 않아요. 주로 메시지랑 지도 정도요."},
  {"speaker":"B","line_order":4,"english_text":"Then this basic plan might work for you.","korean_text":"그럼 이 기본 요금제가 맞을 수 있어요."},
  {"speaker":"A","line_order":5,"english_text":"How much is it per month?","korean_text":"한 달에 얼마인가요?"},
  {"speaker":"B","line_order":6,"english_text":"It’s thirty dollars a month.","korean_text":"한 달에 30달러입니다."},
  {"speaker":"A","line_order":7,"english_text":"Can I cancel anytime?","korean_text":"언제든 해지할 수 있나요?"},
  {"speaker":"B","line_order":8,"english_text":"Yes, there’s no long-term contract.","korean_text":"네, 장기 약정은 없습니다."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '아이 학교 상담',
  '수업 시간 문의',
  '자녀 수업 시간과 준비물을 문의하는 상황',
  24,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I have a question about the class.","korean_text":"안녕하세요, 수업에 대해 질문이 있어요."},
  {"speaker":"B","line_order":2,"english_text":"Sure. What would you like to know?","korean_text":"네. 무엇이 궁금하세요?"},
  {"speaker":"A","line_order":3,"english_text":"What time does it start?","korean_text":"몇 시에 시작하나요?"},
  {"speaker":"B","line_order":4,"english_text":"It starts at 4 p.m.","korean_text":"오후 4시에 시작합니다."},
  {"speaker":"A","line_order":5,"english_text":"Does my child need to bring anything?","korean_text":"아이가 뭘 가져가야 하나요?"},
  {"speaker":"B","line_order":6,"english_text":"Just a notebook and a pencil.","korean_text":"공책과 연필만 가져오면 됩니다."},
  {"speaker":"A","line_order":7,"english_text":"Okay, thank you.","korean_text":"알겠습니다. 감사합니다."},
  {"speaker":"B","line_order":8,"english_text":"No problem. See you then.","korean_text":"천만에요. 그때 뵐게요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '자동차 정비 문의',
  '차 소리 점검하기',
  '차에서 이상한 소리가 나서 정비소에 문의하는 상황',
  25,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, my car is making a strange noise.","korean_text":"안녕하세요, 차에서 이상한 소리가 나요."},
  {"speaker":"B","line_order":2,"english_text":"When do you hear it?","korean_text":"언제 그 소리가 나나요?"},
  {"speaker":"A","line_order":3,"english_text":"Mostly when I start the car.","korean_text":"주로 시동 걸 때 나요."},
  {"speaker":"B","line_order":4,"english_text":"Okay. We should take a look.","korean_text":"알겠습니다. 한번 봐야겠네요."},
  {"speaker":"A","line_order":5,"english_text":"Can I bring it in today?","korean_text":"오늘 가져가도 될까요?"},
  {"speaker":"B","line_order":6,"english_text":"Yes, this afternoon is fine.","korean_text":"네, 오늘 오후 괜찮습니다."},
  {"speaker":"A","line_order":7,"english_text":"Great. I’ll come around three.","korean_text":"좋아요. 3시쯤 갈게요."},
  {"speaker":"B","line_order":8,"english_text":"Sounds good.","korean_text":"좋습니다."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '비 오는 날 일정 변경',
  '비 때문에 약속 바꾸기',
  '비가 많이 와서 약속 장소나 시간을 바꾸는 상황',
  26,
  '[
  {"speaker":"A","line_order":1,"english_text":"It’s raining pretty hard.","korean_text":"비가 꽤 많이 오네."},
  {"speaker":"B","line_order":2,"english_text":"Yeah, I just saw that.","korean_text":"응, 나도 방금 봤어."},
  {"speaker":"A","line_order":3,"english_text":"Do you still want to meet outside?","korean_text":"그래도 밖에서 만날까?"},
  {"speaker":"B","line_order":4,"english_text":"Maybe we should change the place.","korean_text":"장소를 바꾸는 게 좋을 것 같아."},
  {"speaker":"A","line_order":5,"english_text":"How about the mall?","korean_text":"쇼핑몰은 어때?"},
  {"speaker":"B","line_order":6,"english_text":"That works. It’s easier in this weather.","korean_text":"좋아. 이런 날씨엔 그게 더 편하겠다."},
  {"speaker":"A","line_order":7,"english_text":"Okay, let’s meet there at six.","korean_text":"좋아, 거기서 6시에 만나자."},
  {"speaker":"B","line_order":8,"english_text":"See you then.","korean_text":"그때 봐."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '엘리베이터 이웃 대화',
  '이웃과 짧은 안부',
  '엘리베이터에서 이웃과 간단히 대화하는 상황',
  27,
  '[
  {"speaker":"A","line_order":1,"english_text":"Good morning.","korean_text":"좋은 아침이에요."},
  {"speaker":"B","line_order":2,"english_text":"Good morning.","korean_text":"좋은 아침입니다."},
  {"speaker":"A","line_order":3,"english_text":"Nice weather today.","korean_text":"오늘 날씨 좋네요."},
  {"speaker":"B","line_order":4,"english_text":"Yeah, it feels much warmer.","korean_text":"네, 훨씬 따뜻해진 것 같아요."},
  {"speaker":"A","line_order":5,"english_text":"Are you heading to work?","korean_text":"출근하시는 길인가요?"},
  {"speaker":"B","line_order":6,"english_text":"Yes, I’m running a little late.","korean_text":"네, 조금 늦었어요."},
  {"speaker":"A","line_order":7,"english_text":"Hope you make it on time.","korean_text":"제시간에 도착하시길 바라요."},
  {"speaker":"B","line_order":8,"english_text":"Thanks. Have a good day.","korean_text":"감사합니다. 좋은 하루 보내세요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '편의점에서 물건 찾기',
  '건전지 위치 묻기',
  '편의점에서 필요한 물건의 위치를 묻는 상황',
  28,
  '[
  {"speaker":"A","line_order":1,"english_text":"Excuse me, do you sell batteries?","korean_text":"실례합니다, 건전지 파나요?"},
  {"speaker":"B","line_order":2,"english_text":"Yes, they’re near the counter.","korean_text":"네, 계산대 근처에 있어요."},
  {"speaker":"A","line_order":3,"english_text":"Thanks. I couldn’t find them.","korean_text":"감사합니다. 못 찾겠더라고요."},
  {"speaker":"B","line_order":4,"english_text":"No problem. What size do you need?","korean_text":"괜찮아요. 어떤 사이즈가 필요하세요?"},
  {"speaker":"A","line_order":5,"english_text":"AA batteries.","korean_text":"AA 건전지요."},
  {"speaker":"B","line_order":6,"english_text":"They’re on the bottom shelf.","korean_text":"아래쪽 선반에 있어요."},
  {"speaker":"A","line_order":7,"english_text":"Found them. Thanks.","korean_text":"찾았어요. 감사합니다."},
  {"speaker":"B","line_order":8,"english_text":"You’re welcome.","korean_text":"천만에요."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '공항 체크인',
  '짐 부치기',
  '공항 카운터에서 체크인하고 짐을 부치는 상황',
  29,
  '[
  {"speaker":"A","line_order":1,"english_text":"Hi, I’d like to check in.","korean_text":"안녕하세요, 체크인하려고요."},
  {"speaker":"B","line_order":2,"english_text":"Sure. May I see your passport?","korean_text":"네. 여권 보여주시겠어요?"},
  {"speaker":"A","line_order":3,"english_text":"Here you go.","korean_text":"여기 있습니다."},
  {"speaker":"B","line_order":4,"english_text":"Do you have any bags to check?","korean_text":"부치실 짐이 있나요?"},
  {"speaker":"A","line_order":5,"english_text":"Yes, just one suitcase.","korean_text":"네, 캐리어 하나요."},
  {"speaker":"B","line_order":6,"english_text":"Please put it on the scale.","korean_text":"저울 위에 올려주세요."},
  {"speaker":"A","line_order":7,"english_text":"Okay.","korean_text":"네."},
  {"speaker":"B","line_order":8,"english_text":"You’re all set. Here’s your boarding pass.","korean_text":"다 됐습니다. 탑승권 여기 있습니다."}
]'::jsonb
);

select public.insert_conversation_with_lines(
  '지하철 길 묻기',
  '환승 방법 묻기',
  '지하철역에서 목적지까지 가는 방법을 묻는 상황',
  30,
  '[
  {"speaker":"A","line_order":1,"english_text":"Excuse me, how do I get to Central Station?","korean_text":"실례합니다, 센트럴역에 어떻게 가나요?"},
  {"speaker":"B","line_order":2,"english_text":"Take Line 2 and transfer at City Hall.","korean_text":"2호선을 타고 시청에서 갈아타세요."},
  {"speaker":"A","line_order":3,"english_text":"Which line do I transfer to?","korean_text":"어느 노선으로 갈아타야 하나요?"},
  {"speaker":"B","line_order":4,"english_text":"Transfer to Line 1.","korean_text":"1호선으로 갈아타세요."},
  {"speaker":"A","line_order":5,"english_text":"How many stops is it from there?","korean_text":"거기서 몇 정거장인가요?"},
  {"speaker":"B","line_order":6,"english_text":"It’s three stops.","korean_text":"세 정거장입니다."},
  {"speaker":"A","line_order":7,"english_text":"Thanks. That helps a lot.","korean_text":"감사합니다. 큰 도움이 됐어요."},
  {"speaker":"B","line_order":8,"english_text":"No problem.","korean_text":"별말씀을요."}
]'::jsonb
);

-- 확인용
select count(*) as total_conversations from public.conversations;
