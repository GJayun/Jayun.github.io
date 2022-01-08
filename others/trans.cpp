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

char s[N], st[N], stt[N]; 

int main() {
	freopen("word.in", "r", stdin);
	freopen("newword.out", "w", stdout);
	while (gets(s)) {
//		printf ("%s\n", s);
		int len = strlen (s); 
		for (int i = 0, flag = 0; i < len; i++) {
			if (s[i] == '\n' || s[i] == '*') continue;
			if (s[i] == '(') {
				for (; s[i] != ')'; i++)
					printf ("%c", s[i]); 
			}
			if (s[i] == 'b' || s[i] == 'B') {
					if (!flag) printf("\n");
				
			}
			if (s[i] >= 'a' && s[i] <= 'z' || s[i] >= 'A' && s[i] <= 'Z' || s[i] == '\000' && flag || s[i] == ' ' && flag || s[i] == '(' || s[i] == ')' || s[i] == ',') flag = 1;
			else flag = 0; 
			printf ("%c", s[i]);
		}
	}
	return 0;
}

