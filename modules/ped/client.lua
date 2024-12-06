if not lib then return end

local Ped = {}
local pedPreview = nil

function Ped.createPed()
    ActivateFrontendMenu(GetHashKey("FE_MENU_VERSION_EMPTY_NO_BACKGROUND"), false, -1)
    ReplaceHudColourWithRgba(117, 0, 0, 0, 0)
    pedPreview = ClonePed(cache.ped, false, false, false)
    SetEntityVisible(pedPreview, false, false)
    Wait(100)
    SetPedAsNoLongerNeeded(pedPreview)
    GivePedToPauseMenu(pedPreview, 1)
    SetPauseMenuPedLighting(true)
    SetPauseMenuPedSleepState(true)
end

function Ped.deletePed()
    if pedPreview then
        DeleteEntity(pedPreview)
        SetFrontendActive(false)
        pedPreview = nil
    end
end


function Ped.refreshPed()
    if DoesEntityExist(pedPreview) then
        for componentId = 0, 11 do
            local drawableId = GetPedDrawableVariation(cache.ped, componentId)
            local textureId = GetPedTextureVariation(cache.ped, componentId)
            SetPedComponentVariation(pedPreview, componentId, drawableId, textureId, 0)
        end

        for propId = 0, 7 do
            local drawableId = GetPedPropIndex(cache.ped, propId)
            local textureId = GetPedPropTextureIndex(cache.ped, propId)
            if drawableId == -1 then
                ClearPedProp(pedPreview, propId) -- Supprime l'accessoire s'il n'y en a pas
            else
                SetPedPropIndex(pedPreview, propId, drawableId, textureId, true)
            end
        end
    end
end

return Ped