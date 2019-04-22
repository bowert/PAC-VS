from django import forms

class CreateRoomForm(forms.Form):
    lobbyName = forms.CharField(label='Lobby Name', max_length=50, required=True)

    def clean_lobbyName(self):
        lobbyName = self.cleaned_data['lobbyName']
        return lobbyName
