#include <iostream>

using namespace std;

int rightTrianglePlus2()
{

    int col, row, st = 0, i, j, s;

    for (i = 1; i <= 5; i++)
    {

        for (j = 1; j <= i; j++)
        {

            st = st + 2;

            cout << st << " ";
        }

        cout << endl;
    }

    return 0;
}

int piramid()
{

    int row=9, st, i, j, s;

    for (i = 1; i<= row; i++)
    {

        for (s = 1; s <= row - i; s++)
        {

            cout << " ";
        }

        for (st = 1; st <= 2 * i - 1; st++)
        {

            cout << "*";
        }

        cout << endl;
    }

    return 0;
}

int main()
{

    int pattern, row, col;

    cout << "enter your pattern as follow" << endl;

    cout << "for piramid enter 0" << endl;

    cout << "for right triangle plus 2 enter 1" << endl;

    cin >> pattern;

    cout << "enter your  col";

    cin >> col;
    cout << "enter your row ";

    cin >> row;

    if (pattern == 0)
    {

        piramid();
    }

    else if (pattern == 1)
    {

        rightTrianglePlus2();
    }
    else
    {

        cout << "nothing;";
    }

    return 0;
}
