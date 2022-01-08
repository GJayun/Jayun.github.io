#include <cmath>
#include <queue>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <algorithm>
#define ll long long
#define stoorz using
#define AK namespace
#define IOI_and_Jayun_is_stupid std

stoorz AK IOI_and_Jayun_is_stupid;

const int N = 1e5 + 10;

inline ll Read() {
	ll x = 0, f = 1;
	char c = getchar();
	while (c != '-' && (c < '0' || c > '9')) c = getchar();
	if (c == '-') f = -f, c = getchar();
	while (c >= '0' && c <= '9') x = (x << 3) + (x << 1) + c - '0', c = getchar();
	return x * f;
}

char s[N], st[N], stt[N], so[N]; 

int main() {
	freopen("newword.out", "r", stdin);
	freopen(".out", "w", stdout);
	while (gets(s)) {
//		printf ("%s\n", s);
		int len = strlen (s); 
		memset (st, 0, sizeof st);
		memset (so, 0, sizeof so);
		memset (stt, 0, sizeof stt);
		for (int i = 0, j = 0; i < len; i++) {
			if (s[i] == ' ') j = i;
			if (s[i] == '(') {
				for (int k = 0; k < i; k++) st[k] = s[k];
				int k, l;
				for (k = i + 1, l = 0; s[k] != ')'; k++)
					so[l++] = s[k];
				k++, l = 0;
				for (; s[k] == ' '; k++);
				for (int flag = 0; k < len; k++) {
					if (s[k] >= 'a' && s[k] <= 'z' && !flag)
						stt[l++] = '$', flag = 1;
					if (!(s[k] >= 'a' && s[k] <= 'z'))
						flag = 0; 
					stt[l++] = s[k];
					if (s[k] == '.') stt[l++] = '$';
				}
				break;
			}
			if (s[i] == '.') {
				for (int k = 0; k < j; k++) st[k] = s[k];
				for (int k = j + 1, l = 0, flag = 0; k < len; k++) {
					if (s[k] >= 'a' && s[k] <= 'z' && !flag)
						stt[l++] = '$', flag = 1;
					if (!(s[k] >= 'a' && s[k] <= 'z'))
						flag = 0; 
					stt[l++] = s[k];
					if (s[k] == '.') stt[l++] = '$';
				}
				break;
			}
		}
		for (int len = strlen(st) - 1; st[len] == ' '; st[len] = '\000', len--);
		for (int len = strlen(stt) - 1; stt[len] == ' '; stt[len] = '\000', len--);
		if (!strlen(st)) continue;
		if (strlen(so)) 
			printf ("\"%s\": {\n	\"zh\": \"%s\",\n	\"so\": \"%s\"\n},\n", st, stt, so);
		else printf ("\"%s\": {\n	\"zh\": \"%s\"\n},\n", st, stt);
	}
	return 0;
}

