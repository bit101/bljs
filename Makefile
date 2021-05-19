default:
	@rollup -c
	@WINDOWID=`xdotool getactivewindow`
	@xdotool search --name "Mozilla Firefox" windowactivate --sync key --clearmodifiers ctrl+r
	@xdotool windowactivate ${WINDOWID}

