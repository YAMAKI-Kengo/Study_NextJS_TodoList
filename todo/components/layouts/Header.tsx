import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/supabase';

const Header = () => {
  const [currentUser, setcurrentUser] = useState<string | null>(null); // 初期値を null に変更

  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session !== null) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email) {
        setcurrentUser(user.email);
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      {currentUser !== null ? ( // currentUser が null の場合にログインしていない状態として処理する
        <div suppressHydrationWarning={true}>
          <div style={{ paddingBottom: "1rem" }}>{currentUser} でログインしています。</div>
        </div>
      ) : (
        <div suppressHydrationWarning={true}>ログインしていません。</div>
      )}
    </div>
  );
}

export default Header;
