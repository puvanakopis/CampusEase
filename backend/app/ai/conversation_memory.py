from collections import defaultdict
from typing import Dict, List


class ConversationBufferMemory:
    def __init__(self, max_messages: int = 6):
        self.memories: Dict[str, List[dict]] = defaultdict(list)
        self.max_messages = max_messages

    def add_user_message(self, user_id: str, message: str):
        self.memories[user_id].append({
            "role": "user",
            "content": message
        })
        self._trim(user_id)

    def add_ai_message(self, user_id: str, message: str):
        self.memories[user_id].append({
            "role": "assistant",
            "content": message
        })
        self._trim(user_id)

    def get_history(self, user_id: str) -> List[dict]:
        return self.memories.get(user_id, [])

    def clear(self, user_id: str):
        self.memories[user_id] = []

    def _trim(self, user_id: str):
        if len(self.memories[user_id]) > self.max_messages:
            self.memories[user_id] = self.memories[user_id][-self.max_messages:]
